/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useMemo } from "react";

const DialogSure = ({ openDialog, setOpenDialog, action,onAction ,subject}) => {

    const actionHebrew = useMemo(() => {
        if (action === "Add") return "להוסיף";
        else if (action === "Delete") return "למחוק";
        else if (action === "Edit") return "לערוך";
        else return action; // You can specify a default value if needed
    }, [action]);

    const subjectHebrew = useMemo(() => {
        if (subject === "camp") return "בסיס";
        else if (subject === "outpost") return "עמדה";
        else if (subject === "shift") return "משמרת";
        else if (subject === "guard") return "שומר";
        else return subject; // You can specify a default value if needed
    }, [subject]);

    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div>
                    <DialogTitle
                        sx={{ mb: 2 }}
                        id="alert-dialog-title">
                        {`אתה בטוח רוצה ${actionHebrew} ${subjectHebrew}?`}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>לא מסכים</Button>
                        <Button onClick={onAction} autoFocus>מסכים</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}

export default DialogSure