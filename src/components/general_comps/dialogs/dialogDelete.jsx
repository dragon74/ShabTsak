import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useMemo } from "react";
import { doApiMethod } from "../../../services/apiService";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/apiConstants";

DialogDelete.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpenDialog: PropTypes.func.isRequired,
    subject: PropTypes.oneOf(['camp', 'outpost','shift','guard']).isRequired,
    doApi: PropTypes.func.isRequired,
    item: PropTypes.object
}

function DialogDelete ({ openDialog, setOpenDialog, subject, doApi , item })  {

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
            if (resp.status == 200) {
                toast.success(`נמחק בהצלחה ${item.name} ${subjectHebrew}`);
                setOpenDialog(false);
                doApi();
            } else toast.error(resp.massege);
        }
        catch (err) {
            console.log(err);
            toast.error("יש בעיה בבקשה נסה מאוחר יותר");
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

export default DialogDelete