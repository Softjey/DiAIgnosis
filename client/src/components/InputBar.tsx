import { Textarea } from "@nextui-org/react";
import React from "react";
import SendButton from "./buttons/SendButton";
import MicrophoneButton from "./buttons/MicrophoneButton";

interface Props {
  value: string;
  setValue: (value: string) => void;
  handleSend: () => void;
}

const InputBar: React.FC<Props> = ({ value, setValue, handleSend }) => {
  return (
    <div className="flex justify-center items-end gap-3">
      <Textarea
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="Try to be more precise"
        minRows={1}
        value={value}
      />
      <MicrophoneButton />
      <SendButton onClick={handleSend} />
    </div>
  );
};

export default InputBar;
