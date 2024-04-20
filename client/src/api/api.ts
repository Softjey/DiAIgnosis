import axios from "axios";

const BASE_URL = "http://localhost:4000";

export interface Question {
  text: string;
  id: string;
}

interface initialQuestion {
  consultationId: string;
  questions: Question[];
}

interface AnswerResponse {
  status: string;
  questions: Question[];
}

export interface Answer {
  questionId: Question["id"];
  answer: string;
}

export const loadInitQuestion = async (patientComplaint: string) => {
  const response = await axios.post(`${BASE_URL}/consultation/start`, {
    patientComplaint,
  });
  localStorage.setItem("consultationId", response.data.consultationId);
  return response.data as initialQuestion;
};

export const sendAnswer = async (answers: Answer[]) => {
  console.log(answers);
  const consultationId = localStorage.getItem("consultationId");
  const response = await axios.post(`${BASE_URL}/consultation/answer`, {
    answers,
    consultationId,
  });
  return response.data as AnswerResponse;
};
