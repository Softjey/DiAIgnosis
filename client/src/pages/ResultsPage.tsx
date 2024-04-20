import {
  Card,
  CardBody,
  CircularProgress,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import { ResultsRespone, getResults } from "../api/api";
import { UserContext } from "../store/userContext";
import InputGroup from "../components/InputGroup";

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<ResultsRespone | null>(null);
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<string[]>([]);
  const [diagnosisInput, setDiagnosisInput] = useState("");
  const [doctorInput, setDoctorInput] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    getResults().then((newResults) => {
      setResults(newResults);
      setDiagnoses(newResults.diagnosis);
      setDoctors(newResults.doctors);
    });
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {results ? (
        <>
          <h1
            style={{ fontSize: "clamp(3rem, 10vw ,6rem)" }}
            className="text-primary font-medium"
          >
            Results
          </h1>
          <Table
            topContent={<span>{user?.name}:</span>}
            aria-label="Results of diagnoses"
            isStriped
            hideHeader
            className="text-black w-[80vw] text-left results-table"
          >
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>{user?.name}</TableColumn>
            </TableHeader>
            <TableBody>
              {Object.entries(results.results).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Card>
            <CardBody className="flex flex-row justify-evenly suggestions-card-body">
              <RadioGroup label="Possible diagnoses">
                {diagnoses.map((value) => (
                  <Radio value={value}>{value}</Radio>
                ))}
                <InputGroup
                  inputValue={diagnosisInput}
                  setInputValue={setDiagnosisInput}
                  setValue={setDiagnoses}
                />
              </RadioGroup>
              <RadioGroup label="Doctor suggestions">
                {doctors.map((value) => (
                  <Radio value={value}>{value}</Radio>
                ))}
                <InputGroup
                  inputValue={doctorInput}
                  setInputValue={setDoctorInput}
                  setValue={setDoctors}
                />
              </RadioGroup>
            </CardBody>
          </Card>
        </>
      ) : (
        <CircularProgress size="lg" />
      )}
    </div>
  );
};

export default ResultsPage;
