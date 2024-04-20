import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ResultsRespone, getResults } from "../api/api";

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<ResultsRespone | null>(null);

  useEffect(() => {
    getResults().then((newResults) => setResults(newResults));
  }, []);

  return (
    <>
      {results && (
        <Table
          aria-label="Results of diagnoses"
          isStriped
          hideHeader
          className="text-black w-[80vw] text-left"
        >
          <TableHeader>
            <TableColumn>Question</TableColumn>
            <TableColumn>Answer</TableColumn>
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
      )}
    </>
  );
};

export default ResultsPage;
