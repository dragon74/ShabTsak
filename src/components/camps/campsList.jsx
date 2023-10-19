import { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../services/apiService";
import { toast } from "react-toastify";
import { Container, CssBaseline, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import CampItem from "./campItem";

const CampsList = () => {
    const [camps, setCamps] = useState([]);

    useEffect(() => {
        // doApi()
    }, [])

    const doApi = async () => {
        let url = API_URL + "/camps"
        try {
            let resp = await doApiGet(url);
            setCamps(resp.data)
            console.log(resp.data);
        }
        catch (err) {
            console.log(err);
            toast.error(`there problem, try later`)
        }
    }
    return (
        <div>
            <CssBaseline />
            <Container maxWidth="md">
                <h1>רשימת בסיסים</h1>
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
                                <CampItem key={item.id} doApi={doApi} index={i} item={item} />
                            )
                        })}
                    </TableBody>
                </Table>

            </Container>

        </div>
    )
}

export default CampsList