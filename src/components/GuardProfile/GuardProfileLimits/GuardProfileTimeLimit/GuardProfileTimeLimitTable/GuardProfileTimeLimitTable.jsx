import { getDayName } from "../../utils.js";
import { Table, TableBody, TableHead, TableRow, TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const GuardProfileTimeLimitTable = ({ timeLimits, handleDelete }) => {
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
              <IconButton aria-label="delete" color="error" onClick={() => handleDelete(limit.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GuardProfileTimeLimitTable;
