import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import imgUrl from "/img/stock1.jpg";
import Header from "../components/Header";

function StartPage() {
  const navigate = useNavigate();
  const slogan = "AI-Powered Diagnostics for Better Health.";
  const description =
    "The AI surveys and analyzes patient responses and structures the information to make it easier for the doctor to make a diagnosis";
  return (
    <div>
      <Header />
      <main className="flex gap-10 items-center">
        <div className="flex flex-col items-center gap-3">
          <h1
            className="text-black text-7xl font-bold text-center"
            style={{ fontSize: "clamp(40px, 5vw, 80px)" }}
          >
            {slogan}
          </h1>
          <p className="text-black text-xl font-thin">{description}</p>
          <Button
            size="lg"
            color="primary"
            variant="ghost"
            onClick={() => navigate("/consultation")}
          >
            Get Started
          </Button>
        </div>
        <img
          className="w-[50vw] object-center hidden md:[display:unset]"
          src={imgUrl}
          alt="medicine"
        />
      </main>
    </div>
  );
}

export default StartPage;
