import { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../services/apiService";
import { toast } from "react-toastify";
import { Container, CssBaseline } from "@mui/material";
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
            <Container fixed>
                <h1>רשימה של קעמפים במערכת</h1>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>שם</th>
                            <th>עריכה</th>
                            <th>מחיקה</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((item, i) => {
                            return (
                                <CampItem key={item.id} doApi={doApi} index={i} item={item} />
                            )
                        })}
                    </tbody>
                </table>


            </Container>

        </div>
    )
}

export default CampsList