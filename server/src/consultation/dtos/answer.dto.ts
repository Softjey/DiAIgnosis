import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ConsultationID } from '../interfaces/consultation.interface';
import { Question } from '../interfaces/question.interface';

export class AnswerDto {
  @IsString()
  consultationId: ConsultationID;

  @IsNumber()
  questionId: Question['id'];

  @IsNotEmpty()
  answer: string;
}
