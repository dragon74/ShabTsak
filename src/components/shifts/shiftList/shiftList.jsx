import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Typography } from "@mui/material";
import ShiftItem from "./shiftItem/shiftItem";

ShiftList.propTypes = {
    shifts: PropTypes.array.isRequired,
}

export default function ShiftList({ shifts }) {
    const params = useParams();
    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" sx={{ padding: 0 }}>
                <Typography variant="h4" component="h2" mb={2}>
                    רשימת משמרות {params["name"]}
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
                                    <ShiftItem key={item.id}  index={i} item={item} />
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

