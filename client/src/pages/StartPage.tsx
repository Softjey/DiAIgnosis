import { Button } from "@nextui-org/react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => navigate("/login")}
        color="primary"
        size="lg"
        variant="flat"
      >
        Start
      </Button>
    </>
  );
}

export default StartPage;
