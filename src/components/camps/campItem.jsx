/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TableCell, TableRow, IconButton } from "@mui/material";
import DialogCamp from "./dialogCamp";
import DeleteCamp from "./deleteCamp/deleteCamp";
import ROUTES from '../../constants/routeConstants';
import EditIcon from "@mui/icons-material/Edit";

const CampItem = ({ item, index, doApiCamps }) => {

    const [openDialog, setOpenDialog] = useState(false);
    const nav = useNavigate();
    return (
        <TableRow>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">
                <Button
                    color="purple"
                    variant="outlined"
                    onClick={() => {
                        nav(ROUTES.OUTPOSTS + "/" + item.id)
                    }}
                >
                    רשימת עמדות
                </Button>

            </TableCell>
            <TableCell align="center">
                <Box style={{ marginRight: "8px" }}>
                    <IconButton
                        onClick={() => {
                            setOpenDialog(true);
                        }}
                        color="secondary">
                        <EditIcon />
                    </IconButton>
                </Box>
            </TableCell>

            {/* button delete camp */}
            <DeleteCamp item={item} doApiCamps={doApiCamps} />

            <DialogCamp openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                method={"PUT"}
                doApiCamps={doApiCamps}
                item={item}
            />

        </TableRow>
    )
}

export default CampItem