import PropTypes from 'prop-types';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import DialogDelete from "../../../../general_comps/dialogs/dialogDelete";

const CampDeleteItem = ({ item, doApiCamps }) => {
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
CampDeleteItem.propTypes = {
    doApiCamps: PropTypes.func.isRequired,
    item: PropTypes.object
}
export default CampDeleteItem
