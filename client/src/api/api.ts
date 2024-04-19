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
export const loadInitQuestion = async (patientComplaint: string) => {
  const response = await axios.post(`${BASE_URL}/consultation/start`, {
    patientComplaint,
  });
  return response.data as initialQuestion;
};
