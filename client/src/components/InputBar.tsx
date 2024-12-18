import { Textarea } from "@nextui-org/react";
import { useRef } from "react";
import SendButton from "./buttons/SendButton";
import MicrophoneButton from "./buttons/MicrophoneButton";
import SoonAvailablePopover from "./SoonAvailablePopover";

interface Props {
  errorMessage: string;
  disabled: boolean;
  isInvalid: boolean;
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
  classnames?: string;
}

const InputBar: React.FC<Props> = ({
  classnames,
  disabled,
  value,
  setValue,
  onSubmit,
  isInvalid,
  errorMessage,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      onSubmit={() => {
        if (value !== "") {
          onSubmit();
        } else {
          console.warn("value should not be empty");
        }
      }}
      className={`flex justify-center items-end gap-3 relative ${classnames ?? ""}`}
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
            formRef.current?.requestSubmit();
          }
        }}
      />

      <SoonAvailablePopover placement="bottom">
        <MicrophoneButton />
      </SoonAvailablePopover>

      <SendButton type="submit" isDisabled={disabled} />
    </form>
  );
};

export default InputBar;
