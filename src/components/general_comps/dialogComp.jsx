/* eslint-disable react/prop-types */

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormHelperText } from "@mui/material";
import { API_URL, doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const DialogComp = ({ openDialog, setOpenDialog, subject, action }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State to store the form data, you can use React state management or a form library
    const [formData, setFormData] = useState({ name: '' });
    const nav = useNavigate();

    const url = API_URL + "/" + subject;

    const method = useMemo(() => {
        if (action === "Add") return "POST";
        else if (action === "Delete") return "DELETE";
        else if (action === "Edit") return "EDIT";
        else return action; // You can specify a default value if needed
    }, [action]);

    const actionHebrew = useMemo(() => {
        if (action === "Add") return "הוסף";
        else if (action === "Delete") return "מחק";
        else if (action === "Edit") return "ערוך";
        else return action; // You can specify a default value if needed
    }, [action]);

    const subjectHebrew = useMemo(() => {
        if (subject === "camp") return "בסיס";
        else if (subject === "outpost") return "עמדה";
        else if (subject === "shift") return "משמרת";
        else if (subject === "guard") return "שומר";
        else return subject; // You can specify a default value if needed
    }, [subject]);

    const doApiCamp = async (bodyFormData) => {
        try {
            let resp = await doApiMethod(url, method, bodyFormData);
            if (resp.data) {
                toast.success(`${subject} ${action}ed successfully`);
                nav("/");
            } else {
                toast.error("There was a problem, please try again later.");
            }
        } catch (err) {
            console.error(`An error occurred while ${action.toLowerCase()}ing the ${subject}:`, err);
            toast.error("There was a problem. Please try again later.");
        }
    }

    const onSubForm = (formData) => {
        // Use the submitted form data to call your API function
        console.log(formData); // Make sure the form data is captured correctly
        doApiCamp(formData);
        setOpenDialog(false);
    }

    return (
        <Dialog
        style={{ direction: "rtl" }}
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            PaperProps={{
                style: {
                    minWidth: '300px', // Set your minimum width here
                    maxWidth: '90vw',  // Set a maximum width (e.g., 90% of viewport width)
                }
            }}
        >
            <DialogTitle>{actionHebrew} {subjectHebrew}</DialogTitle>
            <form onSubmit={handleSubmit(onSubForm)}>
                <DialogContent style={{ padding: '20px' }}>
                    <TextField
                        {...register("name", { required: true, minLength: 2 })}
                        variant="outlined"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        InputLabelProps={{
                            position: "end", // This sets the label position to the right
                        }}
                        label="שם"
                    />
                    <FormHelperText error={!!errors.name}>
                        {errors.name && 'הכנס שם תקין (מינימום 2 תווים)'}
                    </FormHelperText>
                    {/* Add more TextFields and form fields here as needed */}
                </DialogContent>
                <DialogActions>
                    <Button type="button"
                        onClick={() => setOpenDialog(false)}
                        style={{ marginLeft: '8px' }}>
                        ביטול
                    </Button>
                    <Button type="submit" >{actionHebrew}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DialogComp;
