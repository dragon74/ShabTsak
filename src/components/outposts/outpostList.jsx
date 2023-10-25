/* eslint-disable react/prop-types */

import { CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container } from "@mui/material";
import OutpostItem from "./outpostItem";

const OutpostList = ({ outposts, getOutpostsByCampId, campId }) => {

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" sx={{ padding: 0 }}>
                <h2 className="main-headline">רשימת עמדות</h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">שם</TableCell>
                                <TableCell align="center">מינימום שומרים</TableCell>
                                <TableCell align="center">רשימת שומרים</TableCell>
                                <TableCell align="center">רשימת משמרות</TableCell>
                                <TableCell align="center">פעולות</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {outposts.map((item, i) => {
                                return (
                                    <OutpostItem key={item.id} getOutpostsByCampId={getOutpostsByCampId} index={i} item={item} campId={campId} />
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