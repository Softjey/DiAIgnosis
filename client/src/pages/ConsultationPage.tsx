import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
} from "@nextui-org/react";
import { useState } from "react";
import { loadInitQuestion, sendAnswer } from "../api/api";
import InputBar from "../components/InputBar";
import { useNavigate } from "react-router-dom";
import { Question, Answer } from "../api/questions";

const ConsultationPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isFirstLoaded, setIsFirstLoaded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (isFirstLoaded) {
      setIsLoading(true);
      const response = await loadInitQuestion(inputValue);
      setIsLoading(false);
      setQuestions(response.questions);
      console.log(response);
      setIsFirstLoaded(false);
    } else {
      const newAnswers = [
        ...answers,
        {
          answer: inputValue,
          questionId: questions[currQuestionIndex].id,
        },
      ];

      if (currQuestionIndex + 1 < questions.length) {
        setCurrQuestionIndex((prev) => prev + 1);
        setAnswers(newAnswers);
      } else {
        setIsLoading(true);
        const response = await sendAnswer(newAnswers);
        if (response.status === "ended") {
          navigate("/results");
        }
        setIsLoading(false);
        console.log(response);
        setQuestions(response.questions);
        setAnswers([]);
        setCurrQuestionIndex(0);
      }
    }

    setInputValue("");
  };

  return (
    <div
      className="flex flex-col consultation-container"
      style={{ width: "100%" }}
    >
      {isLoading ? (
        <div className="flex justify-center mb-20">
          <CircularProgress size="lg" />
        </div>
      ) : isFirstLoaded ? (
        <h1
          style={{
            fontWeight: 500,
            marginBottom: "1.5rem",
            fontSize: "clamp(1.5rem, 5vw, 3.75rem)",
            textWrap: "wrap",
          }}
        >
          Describe your problem
        </h1>
      ) : (
        <Card
          shadow="none"
          className="mb-3 bg-zinc-100 pdb-[15px] text-[#000000a4]"
        >
          <CardHeader className="pb-0">Question</CardHeader>
          <CardBody className="pb-8 px-8">
            <p
              style={{ fontSize: "clamp(1.25rem, 5vw, 1.875rem)" }}
              className="text-center"
            >
              {questions[currQuestionIndex].text}
            </p>
          </CardBody>
        </Card>
      )}
      <InputBar
        classnames="input-bar"
        disabled={isLoading}
        handleSend={handleSend}
        value={inputValue}
        setValue={(value: string) => setInputValue(value)}
      />
    </div>
  );
};

export default ConsultationPage;
