import { Button, CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ResultsResponse, getResults } from "../api/api";
import Header from "../components/Header";
import { DoctorsAndDiagnosisCard } from "../components/DoctorsAndDiagnosisCard";
import { ResultsTable } from "../components/ResultsTable";
import SoonAvailablePopover from "../components/SoonAvailablePopover";
import { Link } from "react-router-dom";

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<ResultsResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getResults(signal).then((res) => {
      setResults(res);
    });

    return () => {
      controller.abort();
    };
  }, []);

  if (!results) {
    return (
      <>
        <Header />
        <CircularProgress aria-label="Loading" size="lg" />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col gap-5 mt-10 min-w-[50vw] max-w-[1000px]">
        <>
          <h1 className="text-primary font-medium" style={{ fontSize: "clamp(3rem, 10vw ,6rem)" }}>
            Results
          </h1>

          <ResultsTable results={results} />

          <DoctorsAndDiagnosisCard
            initialDiagnoses={results.diagnosis}
            initialDoctors={results.doctors}
          />

          <div className="flex justify-around">
            <Button as={Link} to="/">
              Go to home
            </Button>

            <SoonAvailablePopover>
              <Button color="success">Send results to the doctor</Button>
            </SoonAvailablePopover>
          </div>
        </>
      </div>
    </>
  );
};

export default ResultsPage;
