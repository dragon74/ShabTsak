import PropTypes from 'prop-types';
import { useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogDelete from "../../../../general_comps/dialogs/dialogDelete";

const ShiftDeleteBtn = ({ item, doApiShifts }) => {
    const [openSureDialog, setOpenSureDialog] = useState(false);

    return (
        <>
            <IconButton aria-label="delete" color="error" onClick={() => {
                setOpenSureDialog(true);
            }}>
                <DeleteIcon />
            </IconButton>
            <DialogDelete openDialog={openSureDialog} setOpenDialog={setOpenSureDialog} subject={"shift"} item={item} doApi={doApiShifts} />
        </>
    )
}

ShiftDeleteBtn.propTypes = {
    doApiShifts: PropTypes.func.isRequired,
    item: PropTypes.object
}
export default ShiftDeleteBtn
