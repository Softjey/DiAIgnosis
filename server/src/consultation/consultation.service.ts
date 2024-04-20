import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import consultationStorage from './consultation.storage';
import { AnswerDto } from './dtos/answer.dto';
import { OpenAiService } from 'src/openai/openai.service';
import { generateStartQuestionsPrompt } from './prompts/generate-start-questions';
import { Consultation } from './interfaces/consultation.interface';
import { generateExtraQuestionsPrompt } from './prompts/generate-extra-questions';
import { Question } from './interfaces/question.interface';
import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';
import { getResultsPrompt } from './prompts/get-results';
import { diagnosisDoctorsPrompt } from './prompts/diagnosis-doctors';
import retry from 'async-retry';

@Injectable()
export class ConsultationService {
  private gptModel: ChatCompletionCreateParamsBase['model'] = 'gpt-3.5-turbo-0125';
  private startPrompt = this.openAiService.systemPrompt(generateStartQuestionsPrompt);
  private continuePrompt = this.openAiService.systemPrompt(generateExtraQuestionsPrompt);
  private resultsPrompt = this.openAiService.systemPrompt(getResultsPrompt);
  private diagnosisDoctorsPrompt = this.openAiService.systemPrompt(diagnosisDoctorsPrompt);

  constructor(private readonly openAiService: OpenAiService) {}

  private async getJSONResponse(messages: ChatCompletionCreateParamsBase['messages']) {
    const trySend = async () => {
      const response = await this.openAiService.chatGptRequest({
        messages,
        model: this.gptModel,
        response_format: { type: 'json_object' },
      });

      return JSON.parse(response);
    };

    return retry(trySend, {
      retries: 2,
      factor: 2, // The exponential factor
      minTimeout: 100, // The number of milliseconds before starting the first retry
      maxTimeout: 100, // The maximum number of milliseconds between two retries
      onRetry: (error, attemptNumber) => {
        console.log(`Attempt ${attemptNumber} failed. Error: ${error.message}`);
      },
    });
  }

  private prepareForClient(questions: Question[]) {
    return questions.map(({ id, text }) => ({ id, text }));
  }

  private getMessagesForGpt(questions: Consultation['questions']) {
    const questionsValues = Array.from(questions.values());

    return questionsValues
      .map(({ text, answer }) => {
        const role = 'user' as const;
        const content = `Question: ${text} Answer: ${answer}`;

        return [{ role, content }];
      })
      .flat();
  }

  private mapToQuestion(questions: string[]): Question[] {
    return questions.map((question) => ({
      id: uuid(),
      text: question,
      answer: null,
    }));
  }

  private async generateResults(consultation: Consultation) {
    const messages = this.getMessagesForGpt(consultation.questions);

    const { results } = await this.getJSONResponse([
      ...this.startPrompt,
      ...messages,
      ...this.resultsPrompt,
    ]);

    return results as Record<string, string>;
  }

  private async generateDiagnosisAndDoctors(consultation: Consultation) {
    const messages = this.getMessagesForGpt(consultation.questions);

    const { diagnosis, doctors } = await this.getJSONResponse([
      ...this.startPrompt,
      ...messages,
      ...this.diagnosisDoctorsPrompt,
    ]);

    return {
      diagnosis: diagnosis as string[],
      doctors: doctors as string[],
    };
  }

  private async generateQuestions(patientComplaint: string) {
    const { questions, error } = await this.getJSONResponse([
      ...this.startPrompt,
      { role: 'user', content: patientComplaint },
    ]);

    if (error) {
      throw new BadRequestException(
        'Please provide a clear health complaint so that I can assist you effectively.',
      );
    }

    return questions as string[];
  }

  private async generateExtraQuestions(consultation: Consultation) {
    const messages = this.getMessagesForGpt(consultation.questions);
    const { questions, end } = await this.getJSONResponse([
      ...this.startPrompt,
      ...messages,
      ...this.continuePrompt,
    ]);

    if (end) {
      return {
        status: 'ended',
        questions: null,
      };
    }

    return {
      status: 'continuing',
      questions: questions as string[],
    };
  }

  async start(patientComplaint: string) {
    const consultationId = uuid();
    const questionsText = await this.generateQuestions(patientComplaint);
    const questions = this.mapToQuestion(questionsText);

    consultationStorage.set(consultationId, {
      questions: new Map(questions.map((question) => [question.id, question])),
    });

    return {
      consultationId,
      questions: this.prepareForClient(questions),
    };
  }

  async answer({ consultationId, answers }: AnswerDto) {
    const consultation = consultationStorage.get(consultationId);

    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    const unansweredQuestions = Array.from(consultation.questions.values()).filter(
      ({ answer }) => !answer,
    );

    if (answers.length !== unansweredQuestions.length) {
      throw new BadRequestException('Invalid number of answers');
    }

    answers.forEach(({ questionId, answer }) => {
      const question = consultation.questions.get(questionId);

      if (!question || question.answer) {
        throw new NotFoundException(`Question with id ${questionId} not found or already answered`);
      }

      consultation.questions.get(questionId).answer = answer;
    });

    if (consultation.questions.size > 4) {
      return {
        status: 'ended',
        questions: null,
      };
    }

    const { questions: textQuestions, status } = await this.generateExtraQuestions(consultation);

    if (status === 'ended') {
      return {
        status,
        questions: null,
      };
    }

    const questions = this.mapToQuestion(textQuestions);

    questions.forEach((question) => {
      consultation.questions.set(question.id, question);
    });

    return {
      status,
      questions: this.prepareForClient(questions),
    };
  }

  async getResults(consultationId: string) {
    const consultation = consultationStorage.get(consultationId);

    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    const [results, { diagnosis, doctors }] = await Promise.all([
      this.generateResults(consultation),
      this.generateDiagnosisAndDoctors(consultation),
    ]);

    return {
      results,
      diagnosis,
      doctors,
    };
  }
}
