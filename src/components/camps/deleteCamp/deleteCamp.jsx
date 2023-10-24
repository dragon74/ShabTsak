/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import DialogDelete from "../../general_comps/dialogs/dialogDelete";

//sure dialog
const DeleteCamp = ({ item, doApiCamps }) => {

    const [openSureDialog, setOpenSureDialog] = useState(false);

    return (
        <>
            <IconButton aria-label="delete" color="error" onClick={() => {
                setOpenSureDialog(true);
            }}>
                <DeleteIcon />
            </IconButton>

            <DialogDelete openDialog={openSureDialog} setOpenDialog={setOpenSureDialog} subject={"camp"} item={item} doApi={doApiCamps} />
        </>
    )
}

export default DeleteCamp