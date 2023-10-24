/* eslint-disable react/prop-types */
import { IconButton, TableCell } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogSureDelete from "../../general_comps/dialogs/dialogSureDelete";
import { useState } from "react";

    //sure dialog
const DeleteCamp = ({ item, doApiCamps }) => {

    const [openSureDialog, setOpenSureDialog] = useState(false);

    return (
        <>
            <TableCell  align="center">
                <IconButton aria-label="delete" color="error" onClick={() => {
                    setOpenSureDialog(true);
                }}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>

            <DialogSureDelete openDialog={openSureDialog} setOpenDialog={setOpenSureDialog} subject={"camp"} item={item} doApi={doApiCamps} />
        </>
    )
}

export default DeleteCamp