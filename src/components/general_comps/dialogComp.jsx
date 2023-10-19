/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormHelperText } from "@mui/material";
import { API_URL, doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

const DialogComp = ({ openDialog, setOpenDialog, subject, action }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State to store the form data, you can use React state management or a form library
    const [formData, setFormData] = useState({ name: '' });
    const nav = useNavigate();
    const params = useParams();


    const doApiCamp = async (bodyFormData) => {
        let url, method;
        if (action === "Add") {
            method = "POST";
            url = API_URL + "/" + subject;
        }
        else if (action === "Delete") {
            method = "DELETE";
            url = API_URL + "/" + subject;
        }
        else if (action === "Edit") {
            method = "PUT";
            url = API_URL + "/" + subject + "/" + params["id"];
        }
        else method = action;

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
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            maxWidth="lg" // Set the maximum width to control the dialog's size (e.g., "md" for medium)
        >
            <DialogTitle>{action} {subject}</DialogTitle>
            <form onSubmit={handleSubmit(onSubForm)}>
                <DialogContent style={{ padding: '20px' }}>
                    <TextField
                        {...register("name", { required: true, minLength: 2 })}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <FormHelperText error={!!errors.name}>
                        {errors.name && 'Enter a valid name (min 2 chars)'}
                    </FormHelperText>
                    {/* Add more TextFields and form fields here as needed */}
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button type="submit">{action}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default DialogComp;
