import axios from "axios";
import { initialQuestion, Answer, AnswerResponse } from "./questions";

const BASE_URL = "https://hackathon-production-ec4e.up.railway.app";
// const BASE_URL = "http://localhost:4000";

export const startConsultation = async (patientComplaint: string) => {
  const response = await axios.post(`${BASE_URL}/consultation/start`, {
    patientComplaint,
  });
  localStorage.setItem("consultationId", response.data.consultationId);
  return response.data as initialQuestion;
};

export const sendAnswer = async (answers: Answer[]) => {
  const consultationId = localStorage.getItem("consultationId");
  const response = await axios.post(`${BASE_URL}/consultation/answer`, {
    answers,
    consultationId,
  });
  return response.data as AnswerResponse;
};

export interface ResultsResponse {
  results: Record<string, string>;
  diagnosis: string[];
  doctors: string[];
}

export const getResults = async (signal?: AbortSignal) => {
  const consultationId = localStorage.getItem("consultationId");
  const { data } = await axios.get(
    `${BASE_URL}/consultation/result?consultationId=${consultationId}`,
    {
      signal,
    }
  );
  return data as ResultsResponse;
};
