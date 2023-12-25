import PropTypes from "prop-types";
import { useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogDelete from "../../../../general_comps/dialogs/dialogDelete";
import EditIcon from "@mui/icons-material/Edit";
import ShiftDialog from "../../../shiftDialog";
import { ContentCopy } from "@mui/icons-material";

export default function ShiftItemActions({ item, onDuplicateShift }) {
    const [openSureDialog, setOpenSureDialog] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <IconButton
                color="secondary"
                onClick={() => {
                    setOpenDialog(true);
                }}
            >
                <EditIcon/>
            </IconButton>

            {openDialog && (
                <ShiftDialog
                    onCloseDialog={() => setOpenDialog(false)}
                    method={"PUT"}
                    key={item.id}
                    item={item}
                />
            )}
            <IconButton
                aria-label="delete"
                color="error"
                onClick={() => {
                    setOpenSureDialog(true);
                }}
            >
                <DeleteIcon/>
            </IconButton>
            <IconButton size="small" aria-label="שכפל משמרת" onClick={onDuplicateShift}>
                <ContentCopy/>
            </IconButton>
            <DialogDelete
                openDialog={openSureDialog}
                setOpenDialog={setOpenSureDialog}
                subject={"shift"}
                item={item}
            />
        </>
    );
}

ShiftItemActions.propTypes = {
    item: PropTypes.object,
};
