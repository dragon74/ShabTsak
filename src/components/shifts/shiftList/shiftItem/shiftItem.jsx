import PropTypes from "prop-types";
import { TableCell, TableRow } from "@mui/material";
import ShiftItemActions from "./shiftItemActions/shiftItemActions";
import { getDayOfWeekHebrew } from "@/utils/dateUtils";
import { useMemo } from "react";

ShiftItem.propTypes = {
  item: PropTypes.object,
};

export default function ShiftItem({ item }) {
  const dayNumber = item.dayId;

  const dayHebrew = useMemo(() => {
    if (dayNumber) {
      return getDayOfWeekHebrew(dayNumber);
    }
    return "";
  }, [dayNumber]);

  return (
    <TableRow>
      <TableCell align="center">{item.dayId}</TableCell>
      <TableCell align="center">{dayHebrew}</TableCell>
      <TableCell align="center" direction="asc">
        {item.fromHour}:00
      </TableCell>
      <TableCell align="center">{item.toHour}:00</TableCell>

      <TableCell
        align="center"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ShiftItemActions item={item} />
      </TableCell>
    </TableRow>
  );
}
