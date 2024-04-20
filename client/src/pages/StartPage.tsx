import { Button } from "@nextui-org/react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import imgUrl from "/img/stock1.jpg";
import logoUrl from "/logo.svg";

function StartPage() {
  const navigate = useNavigate();
  const slogan = "AI-Powered Diagnostics for Better Health.";
  const description =
    "The AI surveys and analyzes patient responses and structures the information to make it easier for the doctor to make a diagnosis";
  return (
    <div>
      <header className="flex w-full justify-start items-center gap-3 absolute top-0 left-0 px-10 py-5 ">
        <img src={logoUrl} alt="" />

        <h3 className="text-black text-3xl">DiAIgnosis</h3>
      </header>
      <main className="flex gap-10 items-center">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-black text-7xl font-bold text-center">
            {slogan}
          </h1>
          <p className="text-black text-xl font-thin">{description}</p>
          <Button
            size="lg"
            color="primary"
            variant="ghost"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
        </div>
        <img
          className="w-[50vw] object-center background-img"
          src={imgUrl}
          alt="medicine"
        />
      </main>
    </div>
  );
}

export default StartPage;
