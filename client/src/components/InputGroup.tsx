import { Input } from "@nextui-org/react";
import PlusButton from "./buttons/PlusButton";

interface Props {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
}

const InputGroup: React.FC<Props> = ({
  inputValue,
  setInputValue,
  setValue,
}) => {
  return (
    <div className="flex gap-2">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        type="text"
        placeholder="Add yours"
      />
      <PlusButton
        onClick={() => {
          if (inputValue !== "") {
            setValue((prev) => [...prev, inputValue]);
            setInputValue("");
          }
        }}
      />
    </div>
  );
};

export default InputGroup;
