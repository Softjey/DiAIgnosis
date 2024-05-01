import { CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ResultsResponse, getResults } from "../api/api";
import Header from "../components/Header";
import { DoctorsAndDiagnosisCard } from "../components/DoctorsAndDiagnosisCard";
import { ResultsTable } from "../components/ResultsTable";

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<ResultsResponse | null>(null);

  useEffect(() => {
    getResults().then(setResults);
  }, []);

  if (!results) {
    return (
      <>
        <Header />
        <CircularProgress size="lg" />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col gap-5">
        <>
          <h1
            className="text-primary font-medium"
            style={{ fontSize: "clamp(3rem, 10vw ,6rem)" }}
          >
            Results
          </h1>
          
          <ResultsTable results={results} />

          <DoctorsAndDiagnosisCard
            initialDiagnoses={results.diagnosis}
            initialDoctors={results.doctors}
          />
        </>
      </div>
    </>
  );
};

export default ResultsPage;
