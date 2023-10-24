/* eslint-disable react/prop-types */

import { Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CampItem from "./campItem";

const CampsList = ({ camps, doApiCamps }) => {

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <h2 className="camps-header">רשימת בסיסים</h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">שם</TableCell>
                                <TableCell align="center">רשימת עמדות</TableCell>
                                <TableCell align="center">עריכה</TableCell>
                                <TableCell align="center">מחיקה</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {camps.map((item, i) => {
                                return (
                                    <CampItem key={item.id} doApiCamps={doApiCamps} index={i} item={item} />
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        </>
    )
}

export default CampsList