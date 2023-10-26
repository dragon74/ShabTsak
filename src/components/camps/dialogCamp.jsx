import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormHelperText, ThemeProvider } from "@mui/material";
import { theme } from "../../services/theme";
import { doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { CAMP_URL } from "../../constants/apiConstants";

DialogCamp.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpenDialog: PropTypes.func.isRequired,
    method: PropTypes.oneOf(['PUT', 'POST']).isRequired,
    doApiCamps: PropTypes.func.isRequired,
    item: PropTypes.object
}

function DialogCamp ({ openDialog, setOpenDialog, method, doApiCamps, item }) {
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        defaultValues: {
            name: method === "PUT" ? item.name : "",
            ...(method === "PUT" && { id: item.id })
        },
    });

    const actionHebrew = useMemo(() => {
        if (method === "POST") return "הוסף";
        else if (method === "PUT") return "ערוך";
        else return method;
    }, [method]);

    const doApiCamp = async (bodyFormData) => {
        try {
            let resp = await doApiMethod(CAMP_URL, method, bodyFormData);
            if (resp.status === 201 && method === "POST")
                toast.success(`בסיס ${getValues('name')} נוסף בהצלחה`);
            else if (resp.status === 200 && method === "PUT")
                toast.success(`בסיס ${item.name} התעדכן בהצלחה`);
            else toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
            doApiCamps();
            setOpenDialog(false);
            reset();
        } catch (err) {
            console.error(`An error occurred while ${method} בסיס`, err);
            toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
        }
    }

    const onSubForm = (formData) => {
        doApiCamp(formData);

    }
    return (
        <ThemeProvider theme={theme}>
            <Dialog
                onClose={() => setOpenDialog(false)}
                open={openDialog}
                PaperProps={{
                    style: {
                        minWidth: '300px', // Set your minimum width here
                        maxWidth: '90vw',  // Set a maximum width (e.g., 90% of viewport width)
                        padding: "30px"
                    }
                }}
            >
                <DialogTitle>{actionHebrew} בסיס {item ? item.name : ""}</DialogTitle>
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
                        <Button type="submit">{actionHebrew}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </ThemeProvider>
    );
}

export default DialogCamp;
