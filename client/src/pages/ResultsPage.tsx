import {
  Card,
  CardBody,
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
      <h1 className="text-8xl text-primary font-medium mb-5">Results</h1>
      {results && (
        <>
          <Table
            topContent={<span>{user?.name}:</span>}
            aria-label="Results of diagnoses"
            isStriped
            hideHeader
            className="text-black w-[80vw] text-left"
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
          <Card className="suggestions-card">
            <CardBody className="flex flex-row justify-evenly">
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
      )}
    </div>
  );
};

export default ResultsPage;
