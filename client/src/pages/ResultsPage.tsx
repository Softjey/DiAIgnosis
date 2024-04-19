import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface Props {
  results: Record<string, string>;
}

const ResultsPage: React.FC<Props> = ({ results }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn>Question</TableColumn>
          <TableColumn>Answer</TableColumn>
        </TableHeader>
        <TableBody>
          {Object.entries(results).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ResultsPage;
