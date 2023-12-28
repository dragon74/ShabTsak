import PropTypes from "prop-types";
import {
  CssBaseline,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from "@mui/material";
import ShiftItem from "./shiftItem/shiftItem";

ShiftList.propTypes = {
  shifts: PropTypes.array.isRequired,
};

export default function ShiftList({ shifts, onDuplciateShift }) {

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ padding: 0 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">יום בשבוע</TableCell>
                <TableCell align="center">משעה </TableCell>
                <TableCell align="center">עד שעה</TableCell>
                <TableCell align="center">פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shifts.map((item, i) => {
                return <ShiftItem key={item.id} index={i} item={item} onDuplicateShift={() => onDuplciateShift(item)} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
