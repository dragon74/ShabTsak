import PropTypes from 'prop-types';
import { useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogDelete from "../../../../general_comps/dialogs/dialogDelete";
import EditIcon from '@mui/icons-material/Edit';
import ShiftDialog from '../../../shiftDialog';

export default function ShiftItemActions ({ item }) {
    const [openSureDialog, setOpenSureDialog] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <IconButton
                // style={{ marginRight: "8px" }}
                color="secondary"
                onClick={() => {
                    setOpenDialog(true);
                }}
            >
                <EditIcon />
            </IconButton>

            <ShiftDialog openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                method={"PUT"}
                item={item}
            />
            {/* Outpost button delete */}
            <IconButton aria-label="delete" color="error" onClick={() => {
                setOpenSureDialog(true);
            }}>
                <DeleteIcon />
            </IconButton>

            <DialogDelete openDialog={openSureDialog} setOpenDialog={setOpenSureDialog} subject={"shift"} item={item} />
        </>
    )
}

ShiftItemActions.propTypes = {
    item: PropTypes.object
}

