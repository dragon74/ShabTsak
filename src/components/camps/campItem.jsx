/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Button, TableCell, TableRow } from "@mui/material";
import DialogComp from "../general_comps/dialogComp";
import DeleteCamp from "./deleteCamp/deleteCamp";

const CampItem = ({ item, index, doApiCamps }) => {

    const [openDialog, setOpenDialog] = useState(false);
    const [action, setAction] = useState("");
    // const nav = useNavigate();
 
    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.name}name</TableCell>

            <TableCell>
                <Box style={{ marginRight: "8px" }}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            setAction("Edit");
                            setOpenDialog(true);
                            // nav("editCamp/" + item.id);
                        }}
                    >
                        עריכה
                    </Button>
                </Box>
            </TableCell>

            {/* button delete camp */}
            <DeleteCamp item={item} doApiCamps={doApiCamps} />

            <DialogComp openDialog={openDialog} setOpenDialog={setOpenDialog} subject={"camp"} action={action} />


        </TableRow>
    )
}

export default CampItem