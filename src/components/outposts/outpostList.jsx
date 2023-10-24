/* eslint-disable react/prop-types */

import { CssBaseline, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import OutpostItem from "./outpostItem";

const OutpostList = ({ outposts, getOutpostsByCampId,campId }) => {

    return (
        <>
            <CssBaseline />
            <h2 className="outposts-header">רשימת עמדות</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">שם</TableCell>
                            <TableCell align="center">מינימום שומרים</TableCell>
                            <TableCell align="center">פעולות</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {outposts.map((item, i) => {
                            return (
                                <OutpostItem key={item.id} getOutpostsByCampId={getOutpostsByCampId} index={i} item={item} campId={campId}/>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default OutpostList