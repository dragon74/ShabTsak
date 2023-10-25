/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogDelete from "../../general_comps/dialogs/DialogDelete";
import { useState } from "react";

//sure dialog
const DeleteCamp = ({ item, getOutpostsByCampId }) => {

    const [openSureDialog, setOpenSureDialog] = useState(false);

    return (
        <>
            <IconButton aria-label="delete" color="error" onClick={() => {
                setOpenSureDialog(true);
            }}>
                <DeleteIcon />
            </IconButton>

            <DialogDelete openDialog={openSureDialog} setOpenDialog={setOpenSureDialog} subject={"outpost"} item={item} doApi={getOutpostsByCampId} />
        </>
    )
}

export default DeleteCamp