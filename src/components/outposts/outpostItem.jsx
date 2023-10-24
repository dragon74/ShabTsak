/* eslint-disable react/prop-types */
import { IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutpost from "./deleteOutpost/deleteOutpost";
import { useState } from "react";
import DialogOutpost from "./dialogOutpost";

const OutpostItem = ({ getOutpostsByCampId, item, campId }) => {

    const [openDialog, setOpenDialog] = useState(false);

    return (
        <TableRow>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.minGuards}</TableCell>

            <TableCell align="center">

                <IconButton
                    color="secondary"
                    onClick={() => {
                        setOpenDialog(true);
                    }}
                >
                    <EditIcon />
                </IconButton>

                {/* button delete Outpost */}
                <DeleteOutpost item={item} getOutpostsByCampId={getOutpostsByCampId} />
            </TableCell>

            <DialogOutpost openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                method={"PUT"}
                getOutpostsByCampId={getOutpostsByCampId}
                item={item}
                campId={campId} />


        </TableRow>
    )
}

export default OutpostItem