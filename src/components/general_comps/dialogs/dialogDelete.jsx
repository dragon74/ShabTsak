import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { useMemo } from "react";
import { toast } from "react-toastify";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { doApiMethod } from "@/services/apiService";
import { API_URL } from "@/constants/apiConstants";
import { getDayOfWeekHebrew } from "@/lib/utils/dateUtils"

DialogDelete.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpenDialog: PropTypes.func.isRequired,
    subject: PropTypes.oneOf(['camp', 'outpost', 'shift', 'guard']).isRequired,
    item: PropTypes.object
}

function DialogDelete({ openDialog, setOpenDialog, subject, item }) {
    // Access the client
    const queryClient = useQueryClient();

    const subjectHebrew = useMemo(() => {
        if (subject === "camp") return "בסיס";
        else if (subject === "outpost") return "עמדה";
        else if (subject === "shift") return "משמרת";
        else if (subject === "guard") return "שומר";
        else return subject; // You can specify a default value if needed
    }, [subject]);


    const doApiDelete = async () => {
        let url = `${API_URL}/${subject}/${item.id}`
        try {
            let resp = await doApiMethod(url, "DELETE");
            if (resp.status == 200) {
                toast.success(`${subjectHebrew}  ${subject === 'shift' ? `יום ${getDayOfWeekHebrew(item.dayId)}` : item.name} נמחק בהצלחה`);
                setOpenDialog(false);
                // marked as outdated.
                // The next time this query is requested, 
                // the caching system will recognize it as outdated and fetch the data again
                queryClient.invalidateQueries(`${subject}s`)
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
                    {`אתה בטוח רוצה למחוק ${subjectHebrew} ${subject === 'shift' ? item.dayId : item.name}?`}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>לא מסכים</Button>
                    <Button onClick={doApiDelete} autoFocus>מסכים</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogDelete