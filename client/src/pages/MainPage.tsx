import {
  Button,
  ButtonProps,
  Card,
  CardBody,
  CardHeader,
  Textarea,
} from "@nextui-org/react";
import Header from "../components/Header";
import { useState } from "react";
import { Question, loadInitQuestion } from "../api/api";

const SendButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button color="secondary" isIconOnly {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
      </svg>
    </Button>
  );
};

const MicrophoneButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button color="primary" isIconOnly {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
        <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
      </svg>
    </Button>
  );
};

const MainPage: React.FC = () => {
  const [textAnswer, setTextAnswer] = useState("");
  const [questions, setQuestions] = useState<Question[] | null>(null);

  return (
    <div className="flex flex-col max-w-[60vw]">
      {questions === null ? (
        <Header
          style={{
            marginBottom: "1.5rem",
            fontSize: "clamp(1.5rem, 10vw, 3.75rem)",
            textWrap: "wrap",
          }}
        >
          Describe your problem
        </Header>
      ) : (
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
              {questions[0].text}
            </p>
          </CardBody>
        </Card>
      )}

      <div className="flex justify-center items-end gap-3">
        <Textarea
          onChange={(e) => setTextAnswer(e.currentTarget.value)}
          placeholder="Try to be more precise"
          minRows={1}
          value={textAnswer}
        />
        <MicrophoneButton />
        <SendButton
          onClick={async () => {
            const response = await loadInitQuestion(textAnswer);
            console.log(response);
            setQuestions(response.questions);
            setTextAnswer("");
          }}
        />
      </div>
    </div>
  );
};

export default MainPage;
