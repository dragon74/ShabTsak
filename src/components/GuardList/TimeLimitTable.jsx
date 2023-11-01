import { getDayName } from "./utils";
import { Table, TableBody, TableHead, TableRow, TableCell, Button } from "@mui/material";
import { useMutation } from "react-query";
import { toast} from "react-toastify";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import TimeLimitService from "@/services/TimeLimitService.js";

const TimeLimitTable = ({ timeLimits }) => {
    const { id: guardId } = useParams()
    const deleteTimeLimit = useMutation(({
        mutationKey: ["timeLimit", guardId],
        mutationFn: (limitId) => TimeLimitService.deleteTimeLimit(limitId),
        onSuccess: () => toast.success("Time limit deleted successfully."),
        onError: () => toast.error("Failed to delete time limit. Please try again."),
        enabled: !!guardId
    }))
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
              <Button onClick={() => deleteTimeLimit(limit.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

TimeLimitTable.propTypes = {
    timeLimits: PropTypes.array.isRequired
}

export default TimeLimitTable;
