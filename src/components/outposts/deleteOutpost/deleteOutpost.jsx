/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogSureDelete from "../../general_comps/dialogs/dialogSureDelete";
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

            <DialogSureDelete openDialog={openSureDialog} setOpenDialog={setOpenSureDialog} subject={"outpost"} item={item} doApi={getOutpostsByCampId} />
        </>
    )
}

export default DeleteCamp