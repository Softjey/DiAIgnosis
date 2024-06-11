import React, { useContext } from "react";
import { ResultsResponse } from "../api/api";
import { Table, TableHeader } from "@nextui-org/react";
import { TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { UserContext } from "../store/userContext";

export interface Props {
  results: ResultsResponse;
}

export const ResultsTable: React.FC<Props> = ({ results }) => {
  const { user } = useContext(UserContext);
  
  return (
    <Table
      topContent={<span>{user?.name ?? "Your consultation results"}:</span>}
      aria-label="Results of diagnoses"
      isStriped
      hideHeader
      className="text-black text-left results-table"
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
  );
};
