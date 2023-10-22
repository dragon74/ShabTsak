/* eslint-disable react/prop-types */

import { Container, CssBaseline, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CampItem from "./campItem";

const CampsList = ({camps, doApiCamps}) => {

    return (
        <div>
            <CssBaseline />
            <Container maxWidth="md">
                <h2>רשימת בסיסים</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>שם</TableCell>
                            <TableCell>עריכה</TableCell>
                            <TableCell>מחיקה</TableCell>
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
            </Container>
        </div>
    )
}

export default CampsList