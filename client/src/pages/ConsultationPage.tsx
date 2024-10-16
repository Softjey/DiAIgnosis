import { CircularProgress } from "@nextui-org/react";
import { useState } from "react";
import * as apiClient from "../api/api";
import InputBar from "../components/InputBar";
import { useNavigate } from "react-router-dom";
import { Question, Answer } from "../api/questions";
import Header from "../components/Header";
import { QuestionCard } from "../components/QuestionCard";
import { useRequest } from "../hooks/useRequest";

const ConsultationPage: React.FC = () => {
  const [handleRequest, isLoading, error] = useRequest();
  const [inputValue, setInputValue] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isFirstLoaded, setIsFirstLoaded] = useState(true);
  const navigate = useNavigate();

  const sendProblem = () => {
    const problemRequest = apiClient.startConsultation(inputValue).then(({ questions }) => {
      setQuestions(questions);
      setIsFirstLoaded(false);
      setInputValue("");
    });

    handleRequest(problemRequest);
  };

  const sendAnswer = () => {
    const answer = inputValue.trim();
    const questionId = questions[currQuestionIndex].id;
    const newAnswers = [...answers, { answer, questionId }];

    if (currQuestionIndex + 1 < questions.length) {
      setCurrQuestionIndex((prevQuestionI) => prevQuestionI + 1);
      setAnswers(newAnswers);
      setInputValue("");

      return;
    }

    const newQuestionsRequest = apiClient.sendAnswer(newAnswers).then(({ questions, status }) => {
      if (status === "ended") {
        navigate("/results");
      }

      setQuestions(questions);
      setAnswers([]);
      setCurrQuestionIndex(0);
      setInputValue("");
    });

    handleRequest(newQuestionsRequest);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col max-w-none md:max-w-[60vw] w-full">
        {isLoading && (
          <div className="flex justify-center mb-20">
            <CircularProgress aria-label="Loading" size="lg" />
          </div>
        )}

        {!isLoading && isFirstLoaded && (
          <h1
            style={{ fontSize: "clamp(1.5rem, 5vw, 3.75rem)" }}
            className="font-medium mb-6 text-wrap"
          >
            Describe your problem
          </h1>
        )}

        {!isLoading && !isFirstLoaded && (
          <QuestionCard questionText={questions[currQuestionIndex].text} />
        )}

        <InputBar
          errorMessage={`Error: ${error}`}
          isInvalid={!!error}
          classnames="input-bar"
          disabled={isLoading}
          onSubmit={isFirstLoaded ? sendProblem : sendAnswer}
          value={inputValue}
          setValue={(value: string) => setInputValue(value)}
        />
      </div>
    </>
  );
};

export default ConsultationPage;
