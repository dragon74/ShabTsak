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
import OutpostItem from "./outpostItem/outpostItem";

OutpostList.propTypes = {
  outposts: PropTypes.array
};

export default function OutpostList({ outposts = [] }) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ padding: 0 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">שם</TableCell>
                <TableCell align="center">מינימום שומרים</TableCell>
                <TableCell align="center">רשימת משמרות</TableCell>
                <TableCell align="center">פעולות</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {outposts?.map((item, i) => {
                return <OutpostItem key={item.id} index={i} item={item} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
