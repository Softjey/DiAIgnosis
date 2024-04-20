export interface Question {
  text: string;
  id: string;
}

export interface initialQuestion {
  consultationId: string;
  questions: Question[];
}

export interface AnswerResponse {
  status: string;
  questions: Question[];
}

export interface Answer {
  questionId: Question["id"];
  answer: string;
}
