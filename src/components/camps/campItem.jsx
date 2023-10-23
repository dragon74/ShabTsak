/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from "react";
import { Box, Button, TableCell, TableRow } from "@mui/material";
import DialogCamp from "./dialogCamp";
import DeleteCamp from "./deleteCamp/deleteCamp";

const CampItem = ({ item, index, doApiCamps }) => {

    const [openDialog, setOpenDialog] = useState(false);
 
    return (
        <TableRow>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell  align="center">{item.name}</TableCell>
            <TableCell align="center">
                <Box style={{ marginRight: "8px" }}>
                    <Button
                        color="secondary"
                        variant="outlined"
                        onClick={() => {
                            setOpenDialog(true);
                        }}
                    >
                        עריכה
                    </Button>
                </Box>
            </TableCell>

            {/* button delete camp */}
            <DeleteCamp item={item} doApiCamps={doApiCamps} />

            <DialogCamp openDialog={openDialog} setOpenDialog={setOpenDialog} action={"Edit"} doApiCamps={doApiCamps} nameItem={item.name}/>


        </TableRow>
    )
}

export default CampItem