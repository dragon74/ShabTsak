/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormHelperText, ThemeProvider } from "@mui/material";
import { theme } from "../../services/theme";
import { doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { OUTPOST_URL } from "../../constants/apiConstants";

const DialogOutpost = ({ openDialog, setOpenDialog, method, getOutpostsByCampId, item = {}, campId }) => {
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        defaultValues: {
            campId: campId,
            id: method == "PUT" ? item.id : "",
            minGuards: method == "PUT" ? item.minGuards : "",
            name: method == "PUT" ? item.name : "",
        },
    });

    const actionHebrew = useMemo(() => {
        if (method === "POST") return "הוסף";
        else if (method === "PUT") return "ערוך";
        else return method;
    }, [method]);

    const doApiOutpost = async (bodyFormData) => {
        try {
            let resp = await doApiMethod(OUTPOST_URL, method, bodyFormData);
            console.log(resp);
            if (resp.status == "201" && method == "POST")
                toast.success(`עמדה ${getValues('name')} נוסף בהצלחה`);
            else if (resp.status == "200" && method === "PUT")
                toast.success(`עמדה ${item.name} התעדכן בהצלחה`);
            else toast.error(resp.message);
            getOutpostsByCampId();
            setOpenDialog(false);
            reset();
        } catch (err) {
            console.error(`An error occurred while ${method}ing the עמדה:`, err);
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
                        <Button type="submit" autoFocus>{actionHebrew}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </ThemeProvider>
    );
};

export default DialogOutpost;
