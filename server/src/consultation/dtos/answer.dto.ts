import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ConsultationID } from '../interfaces/consultation.interface';
import { Question } from '../interfaces/question.interface';
import { Type } from 'class-transformer';

export class AnswerDto {
  @IsString()
  consultationId: ConsultationID;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswersDto)
  answers: AnswersDto[];
}

export class AnswersDto {
  @IsString()
  questionId: Question['id'];

  @IsNotEmpty()
  answer: string;
}
