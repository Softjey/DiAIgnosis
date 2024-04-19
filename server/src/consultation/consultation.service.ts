import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import consultationStorage from './consultation.storage';
import { AnswerDto } from './dtos/answer.dto';
import { OpenAiService } from 'src/openai/openai.service';
import { generateQuestionsPrompt } from './prompts/generate-questions';

@Injectable()
export class ConsultationService {
  constructor(private readonly openAiService: OpenAiService) {}

  private async generateQuestions(patientComplaint: string) {
    const prompt = this.openAiService.systemPrompt(generateQuestionsPrompt);
    const response = await this.openAiService.chatGptRequest({
      messages: [...prompt, { role: 'user', content: patientComplaint }],
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

    const questionsWithIds = questions.map((question, index) => ({
      id: index,
      text: question,
    }));

    return questionsWithIds;
  }

  async start(patientComplaint: string) {
    const consultationId = uuid();
    const questions = await this.generateQuestions(patientComplaint);

    consultationStorage.set(consultationId, {
      questions: new Map(questions.map(({ id, text }) => [id, { id, text }])),
    });

    return {
      consultationID: consultationId,
      questions,
    };
  }

  async answer({ consultationId, answer, questionId }: AnswerDto) {
    const consultation = consultationStorage.get(consultationId);

    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    return {
      additionalQuestions: [],
    };
  }
}
