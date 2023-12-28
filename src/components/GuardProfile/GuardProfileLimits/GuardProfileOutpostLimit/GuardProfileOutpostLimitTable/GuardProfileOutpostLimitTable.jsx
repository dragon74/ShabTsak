import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import GuardProfileOutpostLimitTableRow from "./GuardProfileOutpostLimitTableRow/GuardProfileOutpostLimitTableRow.jsx";

const GuardProfileOutpostLimitTable = ({ outposts, outpostLimits, handleDelete }) => {
  if (!outpostLimits || outpostLimits.length === 0) {
    return <div>לא קיימות מגבלות לפי עמדה.</div>;
  }

  return (

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>שם עמדה</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {outpostLimits.map((outpostLimit) => (
              <GuardProfileOutpostLimitTableRow key={outpostLimit.id} outpostLimit={outpostLimit} outposts={outposts} handleDelete={handleDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default GuardProfileOutpostLimitTable;
