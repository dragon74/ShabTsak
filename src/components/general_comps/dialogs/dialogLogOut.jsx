import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

function DialogLogOut({ openDialog,setOpenDialog,onAction})  {
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
                    אתה בטוח רוצה להתנתק ?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>לא מסכים</Button>
                    <Button onClick={onAction} autoFocus>מסכים</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}
DialogLogOut.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpenDialog: PropTypes.func.isRequired,
    onAction: PropTypes.func.isRequired,
}
export default DialogLogOut