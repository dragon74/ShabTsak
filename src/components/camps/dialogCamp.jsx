/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormHelperText, ThemeProvider } from "@mui/material";
import { theme } from "../../services/theme";
import { API_URL, doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const DialogCamp = ({ openDialog, setOpenDialog, action, doApiCamps, nameItem = "" }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: action === "Edit" ? nameItem : ""
        },
    });

    const method = useMemo(() => {
        if (action === "Add") return "POST";
        else if (action === "Delete") return "DELETE";
        else if (action === "Edit") return "PUT";
        else return action; // You can specify a default value if needed
    }, [action]);

    const actionHebrew = useMemo(() => {
        if (action === "Add") return "הוסף";
        else if (action === "Delete") return "מחק";
        else if (action === "Edit") return "ערוך";
        else return action; // You can specify a default value if needed
    }, [action]);

    const doApiCamp = async (bodyFormData) => {
        let url = API_URL + "/camp";
        try {
            let resp = await doApiMethod(url, method, bodyFormData);
            console.log(resp);
            if (resp.status === "201" && action === "Add")
                toast.success(`בסיס נוסף בהצלחה`);
            else if (resp.status === "200" && action === "Edit")
                toast.success(`בסיס התעדכן בהצלחה`);
            else if (resp.status === "200" && action === "Delete")
                toast.success(`בסיס נמחק בהצלחה`);
            else {
                toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
                return;
            }
            doApiCamps();
            setOpenDialog(false);
            reset();
        } catch (err) {
            console.error(`An error occurred while ${action.toLowerCase()}ing the בסיס:`, err);
            toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
        }
    }

    const onSubForm = (formData) => {
        // Use the submitted form data to call your API function
        console.log(formData); // Make sure the form data is captured correctly
        doApiCamp(formData);

    }

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                PaperProps={{
                    style: {
                        minWidth: '300px', // Set your minimum width here
                        maxWidth: '90vw',  // Set a maximum width (e.g., 90% of viewport width)
                    }
                }}
            >
                <DialogTitle>{actionHebrew} בסיס</DialogTitle>
                <form onSubmit={handleSubmit(onSubForm)}>
                    <DialogContent style={{ padding: '20px' }}>
                        <TextField
                            {...register('name', { required: { value: true, message: 'חובה למלא שם' }, minLength: { value: 2, message: "שם חייב להיות לפחות 2 אותיות'" }, maxLength: 99 })}
                            variant="outlined"
                            fullWidth
                            autoComplete="off"
                            label="שם"
                        />
                        <FormHelperText error={!!errors.name}>
                            {errors.name && errors?.name?.message}
                        </FormHelperText>
                        {/* Add more TextFields and form fields here as needed */}
                    </DialogContent>
                    <DialogActions>
                        <Button type="button"
                            onClick={() => setOpenDialog(false)}
                            style={{ marginLeft: '8px' }}>
                            ביטול
                        </Button>
                        <Button type="submit" autoFocus >{actionHebrew}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </ThemeProvider>
    );
};

export default DialogCamp;
