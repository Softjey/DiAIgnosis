import { Question, QuestionID } from './question.interface';

export interface Consultation {
  questions: Map<QuestionID, Question>;
}

export type ConsultationID = string;
