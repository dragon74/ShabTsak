/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

const DialogSure = ({ openDialog, setOpenDialog, action,OnLogOut }) => {

    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className='p-3'>
                    <DialogTitle
                        sx={{ mb: 2 }}
                        id="alert-dialog-title">
                        {`אתה בטוח רוצה ${action}?`}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>לא מסכים</Button>
                        <Button onClick={OnLogOut} autoFocus>מסכים</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}

export default DialogSure