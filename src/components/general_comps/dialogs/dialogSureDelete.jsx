/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useMemo } from "react";
import { doApiMethod } from "../../../services/apiService";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/apiConstants";

const DialogSureDelete = ({ openDialog, setOpenDialog, subject, doApi = {} }) => {

    const subjectHebrew = useMemo(() => {
        if (subject === "camp") return "בסיס";
        else if (subject === "outpost") return "עמדה";
        else if (subject === "shift") return "משמרת";
        else if (subject === "guard") return "שומר";
        else return subject; // You can specify a default value if needed
    }, [subject]);


    const doApiDeleteCamp = async () => {
        let url = `${API_URL}/${subject}/${item.id}`
        try {
            let resp = await doApiMethod(url, "DELETE");
            // console.log(resp);
            if (resp.status == 200) {
                toast.success(`נמחק בהצלחה ${item.name} ${subject}` );
                doApi();
                setOpenDialog(false);
            } else toast.error(resp.massege);
        }
        catch (err) {
            console.log(err);
            toast.error(resp.massege)
        }
    }
    return (
        <>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    sx={{ mb: 2 }}
                    id="alert-dialog-title">
                    {`אתה בטוח רוצה למחוק ${subjectHebrew} ${item.name}?`}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>לא מסכים</Button>
                    <Button onClick={doApiDeleteCamp} autoFocus>מסכים</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default DialogSureDelete