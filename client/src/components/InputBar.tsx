import { Textarea } from "@nextui-org/react";
import React from "react";
import SendButton from "./buttons/SendButton";
import MicrophoneButton from "./buttons/MicrophoneButton";

interface Props {
  errorMessage: string;
  disabled: boolean;
  isInvalid: boolean;
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
  isInvalid,
  errorMessage,
}) => {
  return (
    <div
      className={`flex justify-center items-end gap-3 relative ${
        classnames ?? ""
      }`}
    >
      <Textarea
        color={isInvalid ? "danger" : "default"}
        isDisabled={disabled}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder={isInvalid ? errorMessage : "Try to be more precise"}
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
