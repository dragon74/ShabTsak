import PropTypes from 'prop-types';
import { Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CampItem from "./campItem/campItem";

CampList.propTypes = {
    camps: PropTypes.array
}

function CampList({camps}) {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" sx={{ padding: 0 }}>
                <Typography variant="h4" component="h2" mb={2}>
                    רשימת בסיסים
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">שם</TableCell>
                                <TableCell align="center">רשימת עמדות</TableCell>
                                <TableCell align="center">רשימת שומרים</TableCell>
                                <TableCell align="center">פעולות</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {camps.map((item, i) => {
                                return (
                                    <CampItem key={item.id} index={i} item={item} />
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default CampList