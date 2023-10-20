/* eslint-disable react/prop-types */


import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, TableCell } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogSure from "../../general_comps/dialogSure";
import { useState } from "react";
import { API_URL, doApiMethod } from "../../../services/apiService";


const DeleteCamp = ({ item ,doApiCamps}) => {
    const [action, setAction] = useState("");
    const nav = useNavigate();

    //sure dialog
    const [openSureDialog, setOpenSureDialog] = useState(false);

    //open sure dialog for delete camp
    const OnDeleteCamp = () => {
        doApiDeleteCamp()
    }

    const doApiDeleteCamp = async () => {
        let url = API_URL + "/camp/" + item.id
        try {
            let resp = await doApiMethod(url, "DELETE");
            console.log(resp);
            if (resp.data) {
                toast.success(`בסיס נמחק בהצלחה`);
                doApiCamps();
                setOpenSureDialog(false);
                nav("/");
            } else {
                toast.error("יש בעיה בבקשה נסה אוחר יותר");
            }
        }
        catch (err) {
            console.log(err);
            toast.error(`there problem, try later`)
        }
    }
    return (
        <>

            <TableCell>
                <Button
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                        setAction("Delete");
                        setOpenSureDialog(true);
                    }}>
                    מחיקה
                </Button>
            </TableCell>

            <DialogSure openDialog={openSureDialog} setOpenDialog={setOpenSureDialog} subject={"camp"} action={action} onAction={OnDeleteCamp} />


        </>
    )
}

export default DeleteCamp