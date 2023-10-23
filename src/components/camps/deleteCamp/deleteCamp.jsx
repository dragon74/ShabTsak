/* eslint-disable react/prop-types */
import { Button, TableCell } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogSureDelete from "../../general_comps/dialogSureDelete";
import { useState } from "react";


const DeleteCamp = ({ item ,doApiCamps}) => {

    //sure dialog
    const [openSureDialog, setOpenSureDialog] = useState(false);

    return (
        <>
            <TableCell>
                <Button
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                        setOpenSureDialog(true);
                    }}>
                    מחיקה
                </Button>
            </TableCell>

            <DialogSureDelete openDialog={openSureDialog} setOpenDialog={setOpenSureDialog} subject={"camp"} idItem={item.id} doApiCamps={doApiCamps} />
        </>
    )
}

export default DeleteCamp