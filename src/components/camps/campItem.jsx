/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react";
import { Box, Button, TableCell, TableRow } from "@mui/material";
import DialogCamp from "../general_comps/dialogs/dialogCamp";
import DeleteCamp from "./deleteCamp/deleteCamp";

const CampItem = ({ item, index, doApiCamps }) => {

    const [openDialog, setOpenDialog] = useState(false);
    const [action, setAction] = useState("");
 
    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.name}</TableCell>

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

            <DialogCamp openDialog={openDialog} setOpenDialog={setOpenDialog} action={action} doApiCamps={doApiCamps}/>


        </TableRow>
    )
}

export default CampItem