/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormHelperText, ThemeProvider } from "@mui/material";
import { theme } from "../../services/theme";
import { API_URL, doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const DialogOutpost = ({ openDialog, setOpenDialog, action, getOutpostsByCampId, item = {}, campId }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            campId: campId,
            id: action == "Edit" ? item.id : "",
            minGuards: action == "Edit" ? item.minGuards : "",
            name: action == "Edit" ? item.name : "",
        },
    });

    const method = useMemo(() => {
        if (action === "Add") return "POST";
        else if (action === "Edit") return "PUT";
        else return action;
    }, [action]);

    const actionHebrew = useMemo(() => {
        if (action === "Add") return "הוסף";
        else if (action === "Edit") return "ערוך";
        else return action;
    }, [action]);

    const doApiOutpost = async (bodyFormData) => {
        let url = API_URL + "/outpost";
        try {
            let resp = await doApiMethod(url, method, bodyFormData);
            console.log(resp);
            if (resp.status == "201" && action == "Add") {
                toast.success(`עמדה נוספה בהצלחה`);
                reset();
            }
            else if (resp.status == "200" && action === "Edit") {
                toast.success(`עמדה התעדכנה בהצלחה`);
                setOpenDialog(false);
            }
            else {
                toast.error(resp.message);
                return;
            }
            getOutpostsByCampId();
        } catch (err) {
            console.error(`An error occurred while ${action.toLowerCase()}ing the עמדה:`, err);
            toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
        }
    }

    const onSubForm = (formData) => {
        // Use the submitted form data to call your API function
        console.log(formData); // Make sure the form data is captured correctly
        doApiOutpost(formData);
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
                        padding: "30px"
                    }
                }}
            >
                <DialogTitle>{actionHebrew} עמדה {item.name}</DialogTitle>
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

                        <TextField
                            {...register('minGuards', {
                                required:
                                    { value: true, message: 'חובה למלא כמה שומרים בעמדה' },
                                min: { value: 2, message: "מנימום 2 שומרים בעמדה" },
                                max: 99
                            })}
                            color="primary"
                            size="small"
                            autoComplete="off"
                            label="מקסימום שומרים בעמדה"
                            sx={{ marginTop: "8px" }}
                        />
                        <FormHelperText error={!!errors.minGuards}>
                            {errors.minGuards && errors?.minGuards?.message}
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

export default DialogOutpost;
