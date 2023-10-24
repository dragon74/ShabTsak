/* eslint-disable react/prop-types */
import { IconButton, TableCell, TableRow, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutpost from "./deleteOutpost/deleteOutpost";
import { useState } from "react";
import DialogOutpost from "./dialogOutpost";
import ROUTES from "../../constants/routeConstants";
import { useNavigate } from "react-router-dom";

const OutpostItem = ({ getOutpostsByCampId, item, campId }) => {

    const nav = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <TableRow>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.minGuards}</TableCell>
            <TableCell align="center">
                <Button
                    color="brown"
                    variant="outlined"
                    onClick={() => {
                        nav(ROUTES.GUARDS + "/" + item.id)
                    }}
                >
                    שומרים
                </Button>
            </TableCell>

            <TableCell align="center">
                <Button
                    color="orange"
                    variant="outlined"
                    onClick={() => {
                        nav(ROUTES.SHIFTS + "/" + item.id)
                    }}
                >
                    משמרות
                </Button>
            </TableCell>

            <TableCell
                align="center"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <IconButton
                    // style={{ marginRight: "8px" }}
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
                campId={campId}
            />


        </TableRow>
    )
}

export default OutpostItem