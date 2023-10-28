import PropTypes from 'prop-types';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogDelete from "../../../../general_comps/dialogs/dialogDelete";
import { useState } from 'react';

const CampDeleteBtn = ({ item, doApiCamps }) => {
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
CampDeleteBtn.propTypes = {
    doApiCamps: PropTypes.func.isRequired,
    item: PropTypes.object
}
export default CampDeleteBtn
