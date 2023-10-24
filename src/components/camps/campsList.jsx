/* eslint-disable react/prop-types */

import { Container, CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CampItem from "./campItem";

const CampsList = ({ camps, doApiCamps }) => {

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" sx={{ padding: 0 }}>
                <h2 className="main-headline">רשימת בסיסים</h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">שם</TableCell>
                                <TableCell align="center">רשימת עמדות</TableCell>
                                <TableCell align="center">פעולות</TableCell>
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