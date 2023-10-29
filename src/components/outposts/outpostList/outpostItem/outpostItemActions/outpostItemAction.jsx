import PropTypes from 'prop-types';
import { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogDelete from '../../../../general_comps/dialogs/dialogDelete';
import OutpostDialog from '../../../outpostDialog';

OutpostItemActions.propTypes = {
    item: PropTypes.object.isRequired
}

export default function OutpostItemActions({ item }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [openSureDialog, setOpenSureDialog] = useState(false);
    return (
        <>
            <IconButton
                color="secondary"
                onClick={() => {
                    setOpenDialog(true);
                }}
            >
                <EditIcon />
            </IconButton>

            <OutpostDialog openDialog={openDialog}
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

            <DialogDelete openDialog={openSureDialog} setOpenDialog={setOpenSureDialog} subject={"outpost"} item={item} />

        </>
    )
}


