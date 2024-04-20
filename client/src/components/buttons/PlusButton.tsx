import { ButtonProps, Button } from "@nextui-org/react";

const PlusButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button {...props} isIconOnly>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </Button>
  );
};

export default PlusButton;
