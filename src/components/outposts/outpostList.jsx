/* eslint-disable react/prop-types */

import { CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Typography } from "@mui/material";
import OutpostItem from "./outpostItem";
import { useSearchParams } from "react-router-dom";

const OutpostList = ({ outposts, getOutpostsByCampId }) => {
    const [querys] = useSearchParams();

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" sx={{ padding: 0 }}>
                <Typography variant="h4" component="h2" mb={2}>
                    רשימת עמדות {querys.get("campName")}
                </Typography>
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
                            {outposts.map((item, i) => {
                                return (
                                    <OutpostItem key={item.id} getOutpostsByCampId={getOutpostsByCampId} index={i} item={item} />
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default OutpostList