import PropTypes from 'prop-types';
import { useSearchParams } from "react-router-dom";
import { CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Typography } from "@mui/material";
import ShiftItem from "./shiftItem/shiftItem";

ShiftList.propTypes = {
    shifts: PropTypes.array.isRequired,
    doApiShifts: PropTypes.func.isRequired,
}

export default function ShiftList({ shifts, doApiShifts }) {
    const [querys] = useSearchParams();

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" sx={{ padding: 0 }}>
                <Typography variant="h4" component="h2" mb={2}>
                    רשימת משמרות {querys.get("outpostName")}
                </Typography>
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
                                return (
                                    <ShiftItem key={item.id} doApiShifts={doApiShifts} index={i} item={item} />
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

