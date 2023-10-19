/* eslint-disable react/prop-types */
import {useNavigate } from "react-router-dom";
import DialogComp from "../general_comps/dialogComp";
import { useState } from "react";
import { Box, Button } from "@mui/material";

const CampItem = (props) => {
    let item = props.item;
    const [openDialog, setOpenDialog] = useState(false);
    const [action, setAction] = useState("");
    const nav = useNavigate();


    return (
        <tr>
            <th>{props.index + 1}</th>
            <th>{item.name}</th>
            <td>
                <Box style={{ marginRight: "8px" }}>
                    <Button color="primary" variant="contained"
                        onClick={() => {
                            setAction("Edit")
                            setOpenDialog(true);
                            nav("editCamp/" + item.id)
                        }}>
                        Edit
                    </Button>
                </Box>
            </td>
            <td>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        setAction("Delete")
                        setOpenDialog(true);
                    }}>
                    Delete
                </Button>
            </td>

            <DialogComp openDialog={openDialog} setOpenDialog={setOpenDialog} subject={"camp"} action={action} />


        </tr>
    )
}

export default CampItem