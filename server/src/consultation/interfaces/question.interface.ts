export type QuestionID = string;

export interface Question {
  id: QuestionID;
  text: string;
  answer: null | string;
}
