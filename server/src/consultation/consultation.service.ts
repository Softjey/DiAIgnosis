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

@Injectable()
export class ConsultationService {
  private gptModel: ChatCompletionCreateParamsBase['model'] = 'gpt-3.5-turbo-0125';
  private startPrompt = this.openAiService.systemPrompt(generateStartQuestionsPrompt);
  private continuePrompt = this.openAiService.systemPrompt(generateExtraQuestionsPrompt);

  constructor(private readonly openAiService: OpenAiService) {}

  private prepareForClient(questions: Question[]) {
    return questions.map(({ id, text }) => ({ id, text }));
  }

  private mapToQuestion(questions: string[]): Question[] {
    return questions.map((question) => ({
      id: uuid(),
      text: question,
      answer: null,
    }));
  }

  private async generateQuestions(patientComplaint: string) {
    const response = await this.openAiService.chatGptRequest({
      messages: [...this.startPrompt, { role: 'user', content: patientComplaint }],
      model: this.gptModel,
      response_format: { type: 'json_object' },
    });

    const { questions, error } = JSON.parse(response);

    if (error) {
      throw new BadRequestException(
        'Please provide a clear health complaint so that I can assist you effectively.',
      );
    }

    console.log('questions', questions);

    return questions as string[];
  }

  private async generateExtraQuestions(consultation: Consultation) {
    const questionsValues = Array.from(consultation.questions.values());
    const messages = questionsValues
      .map(({ text, answer }) => [
        {
          role: 'user' as const,
          content: `Question: ${text} Answer: ${answer}`,
        },
      ])
      .flat();

    const response = await this.openAiService.chatGptRequest({
      messages: [...this.startPrompt, ...messages, ...this.continuePrompt],
      model: this.gptModel,
      response_format: { type: 'json_object' },
    });

    const { questions } = JSON.parse(response);

    return questions as string[];
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
      if (!consultation.questions.has(questionId)) {
        throw new NotFoundException(`Question with id ${questionId} not found`);
      }

      consultation.questions.get(questionId).answer = answer;
    });

    const extraQuestionsText = await this.generateExtraQuestions(consultation);
    const questions = this.mapToQuestion(extraQuestionsText);

    return {
      status: '...',
      questions: this.prepareForClient(questions),
    };
  }
}
