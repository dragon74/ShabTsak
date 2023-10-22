import React from 'react';
import { ThemeProvider, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { theme } from "../../../services/theme";
import { useUserStore } from "../../../services/useUserStore";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

export default function DialogLogOut({ close }) {
    const logout = useUserStore((store) => store.logout);
    const [open, setOpen] = React.useState(true)
    const handleLogout = () => {
        logout();
        toast.success("התנתקת בהצלחה")
        handleClose();
    }
    
    const handleClose = () => {
        setOpen(false);
        const timeout = setTimeout(() => {
            close();
            clearTimeout(timeout);
        }, 300);
    }
    
    return (
        <ThemeProvider theme={theme}>
        <Dialog
            open={open}
            PaperProps={{
                style: {
                    minWidth: '300px', // Set your minimum width here
                    maxWidth: '90vw',  // Set a maximum width (e.g., 90% of viewport width)
                }
            }}
        >
            <DialogTitle>התנתקות</DialogTitle>
            <DialogContent style={{ padding: '20px' }}>
                 האם אתה בטוח שברצונך להתנתק מהמשתמש?
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleLogout}
                    variant="contained"
                    style={{ marginLeft: '8px' }}>
                    התנתק
                </Button>
                <Button onClick={handleClose} autoFocus>ביטול</Button>
            </DialogActions>
        </Dialog>
    </ThemeProvider>
    )
}

DialogLogOut.propTypes = {
    close: PropTypes.func
}