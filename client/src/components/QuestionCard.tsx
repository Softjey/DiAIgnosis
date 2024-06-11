import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface Props {
  questionText: string;
}

export const QuestionCard: React.FC<Props> = ({ questionText }) => {
  return (
    <Card
      shadow="none"
      className="mb-3 bg-zinc-100 pdb-[15px] text-[#000000a4]"
    >
      <CardHeader className="pb-0">Question</CardHeader>
      <CardBody className="pb-8 px-8">
        <p
          style={{ fontSize: "clamp(1.25rem, 5vw, 1.875rem)" }}
          className="text-center max-w-[600px]"
        >
          {questionText}
        </p>
      </CardBody>
    </Card>
  );
};
