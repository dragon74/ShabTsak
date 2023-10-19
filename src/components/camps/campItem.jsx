/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// import { useNavigate } from "react-router-dom";
import DialogComp from "../general_comps/dialogComp";
import { useState } from "react";
import { Box, Button, TableCell, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const CampItem = () => {
    let item = props.item;
    const [openDialog, setOpenDialog] = useState(false);
    const [action, setAction] = useState("");
    // const nav = useNavigate();


    return (
        <TableRow>
            <TableCell>{props.index + 1}</TableCell>
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

            <TableCell>
                <Button
                color="error"
                variant="outlined" 
                startIcon={<DeleteIcon />}
                    onClick={() => {
                        setAction("Delete");
                        setOpenDialog(true);
                    }}>
                    מחיקה
                </Button>
            </TableCell>

            <DialogComp openDialog={openDialog} setOpenDialog={setOpenDialog} subject={"camp"} action={action} />


        </TableRow>
    )
}

export default CampItem