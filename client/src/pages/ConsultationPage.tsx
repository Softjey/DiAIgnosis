import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
} from "@nextui-org/react";
import Header from "../components/Header";
import { useState } from "react";
import { Answer, Question, loadInitQuestion, sendAnswer } from "../api/api";
import InputBar from "../components/InputBar";
import { useNavigate } from "react-router-dom";

const ConsultationPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isFirstLoaded, setIsFirstLoaded] = useState(true);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (isFirstLoaded) {
      const response = await loadInitQuestion(inputValue);
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
        const response = await sendAnswer(newAnswers);
        console.log(response);
        setQuestions(response.questions);
        setAnswers([]);
        setCurrQuestionIndex(0);
      }
    }

    setInputValue("");
  };

  return (
    <div className="flex flex-col max-w-[60vw]">
      {isFirstLoaded ? (
        <Header
          style={{
            marginBottom: "1.5rem",
            fontSize: "clamp(1.5rem, 10vw, 3.75rem)",
            textWrap: "wrap",
          }}
        >
          Describe your problem
        </Header>
      ) : questions[currQuestionIndex] ? (
        <Card
          shadow="none"
          className="mb-3 bg-zinc-100 pdb-[15px] text-[#000000a4]"
        >
          <CardHeader className="pb-0">Question</CardHeader>
          <CardBody className="pb-8 px-8">
            <p
              style={{ fontSize: "clamp(1.25rem, 5vw, 1.875rem)" }}
              className="text-center text-black"
            >
              {questions[currQuestionIndex].text}
            </p>
          </CardBody>
        </Card>
      ) : (
        <CircularProgress />
      )}
      <InputBar
        handleSend={handleSend}
        value={inputValue}
        setValue={(value: string) => setInputValue(value)}
      />
      {/* <Button onClick={() => navigate("/results")}></Button> */}
    </div>
  );
};

export default ConsultationPage;
