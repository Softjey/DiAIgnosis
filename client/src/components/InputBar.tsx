import { Textarea } from "@nextui-org/react";
import React from "react";
import SendButton from "./buttons/SendButton";
import MicrophoneButton from "./buttons/MicrophoneButton";

interface Props {
  disabled: boolean;
  value: string;
  setValue: (value: string) => void;
  handleSend: () => void;
  classnames?: string;
}

const InputBar: React.FC<Props> = ({
  classnames,
  disabled,
  value,
  setValue,
  handleSend,
}) => {
  return (
    <div className={`flex justify-center items-end gap-3 ${classnames ?? ''}`}>
      <Textarea
        isDisabled={disabled}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="Try to be more precise"
        minRows={1}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <MicrophoneButton isDisabled={true} />
      <SendButton isDisabled={disabled} onClick={handleSend} />
    </div>
  );
};

export default InputBar;
