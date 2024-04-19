import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import consultationStorage from './consultation.storage';
import { AnswerDto } from './dtos/answer.dto';
import { OpenAiService } from 'src/openai/openai.service';
import { generateStartQuestionsPrompt } from './prompts/generate-start-questions';
import { Consultation } from './interfaces/consultation.interface';
import { generateAdditionalQuestionsPrompt } from './prompts/generate-additional-questions';

@Injectable()
export class ConsultationService {
  private startPrompt = this.openAiService.systemPrompt(
    generateStartQuestionsPrompt,
  );
  private continuePrompt = this.openAiService.systemPrompt(
    generateAdditionalQuestionsPrompt,
  );

  constructor(private readonly openAiService: OpenAiService) {}

  private async generateQuestions(patientComplaint: string) {
    const response = await this.openAiService.chatGptRequest({
      messages: [
        ...this.startPrompt,
        { role: 'user', content: patientComplaint },
      ],
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' },
    });

    const { questions } = JSON.parse(response);

    console.log('questions', questions);

    if (questions[0] === 'BAD_REQUEST') {
      throw new BadRequestException(
        'Please provide a clear health complaint so that I can assist you effectively.',
      );
    }

    return questions as string[];
  }

  private async generateAdditionalQuestions(consultation: Consultation) {
    const questionsValues = Array.from(consultation.questions.values());
    const messages = questionsValues
      .map(({ text, answer }) => [
        { role: 'assistant' as const, content: text },
        { role: 'user' as const, content: answer },
      ])
      .flat();

    const response = await this.openAiService.chatGptRequest({
      messages: [...this.startPrompt, ...messages, ...this.continuePrompt],
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' },
    });

    const { questions } = JSON.parse(response);

    return questions as string[];
  }

  async start(patientComplaint: string) {
    const consultationId = uuid();
    const questions = await this.generateQuestions(patientComplaint);

    consultationStorage.set(consultationId, {
      questions: new Map(
        questions.map((questionText) => {
          const id = uuid();

          return [id, { id, text: questionText, answer: null }];
        }),
      ),
    });

    return {
      consultationId,
      questions,
    };
  }

  async answer({ consultationId, answer, questionId }: AnswerDto) {
    const consultation = consultationStorage.get(consultationId);

    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    if (!consultation.questions.has(questionId)) {
      throw new NotFoundException('Question not found');
    }

    consultation.questions.get(questionId).answer = answer;

    const extraQuestions = await this.generateAdditionalQuestions(consultation);

    return {
      extraQuestions,
    };
  }
}
