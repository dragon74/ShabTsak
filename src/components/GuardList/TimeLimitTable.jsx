import { getDayName } from "./utils";
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from "@mui/material";

const TimeLimitTable = ({ timeLimits, handleDelete }) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>יום</TableCell>
          <TableCell>משעה</TableCell>
          <TableCell>עד שעה</TableCell>
          <TableCell>פעולות</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {timeLimits.map((limit) => (
          <TableRow key={limit.id}>
            <TableCell>{getDayName(limit.dayId)}</TableCell>
            <TableCell>{limit.fromHour}:00</TableCell>
            <TableCell>{limit.toHour}:00</TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(limit.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TimeLimitTable;
