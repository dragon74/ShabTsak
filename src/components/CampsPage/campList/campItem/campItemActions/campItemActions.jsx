import PropTypes from 'prop-types';
import { useState } from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import DialogDelete from "../../../../general_comps/dialogs/dialogDelete";
import DialogCamp from '../../../campDialog';

const CampItemActions = ({ item }) => {
    const [openSureDialog, setOpenSureDialog] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <IconButton
                // sx={{ marginRight: "8px" }}
                onClick={() => {
                    setOpenDialog(true);
                }}
                color="secondary">
                <EditIcon />
            </IconButton>

            <DialogCamp openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                method={"PUT"}
                item={item}
            />

            <IconButton aria-label="delete" color="error" onClick={() => {
                setOpenSureDialog(true);
            }}>
                <DeleteIcon />
            </IconButton>

            <DialogDelete openDialog={openSureDialog}
                setOpenDialog={setOpenSureDialog} subject={"camp"}
                item={item}
            />


        </>
    )
}
CampItemActions.propTypes = {
    item: PropTypes.object.isRequired
}
export default CampItemActions
