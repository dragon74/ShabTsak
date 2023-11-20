import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import GuardOutpostTableRow from "./GuardOutpostTableRow";

const GuardOutpostLimitList = ({ outposts, outpostLimits, handleDelete }) => {
  if (!outpostLimits || outpostLimits.length === 0) {
    return <div>לא קיימות מגבלות לפי עמדה.</div>;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>שם עמדה</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {outpostLimits.map((outpostLimit) => (
              <GuardOutpostTableRow key={outpostLimit.id} outpostLimit={outpostLimit} outposts={outposts} handleDelete={handleDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GuardOutpostLimitList;
