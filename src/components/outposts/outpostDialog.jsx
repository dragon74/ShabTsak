import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormHelperText, ThemeProvider } from "@mui/material";
import { theme } from "../../services/theme";
import { doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { OUTPOST_URL } from "../../constants/apiConstants";
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';

OutpostDialog.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpenDialog: PropTypes.func.isRequired,
    method: PropTypes.oneOf(['PUT', 'POST']).isRequired,
    item: PropTypes.object
}

export default function OutpostDialog({ openDialog, setOpenDialog, method, item = {} }) {
    // Access the client
    const queryClient = useQueryClient();

    const params = useParams();
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        defaultValues: {
            ...(method === "PUT" && { id: item.id }),
            campId: params["id"],
            minGuards: item.minGuards || '',
            name: item.name || ''
        }
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
            if (resp.status === 201 && method === "POST")
                toast.success(`עמדה ${getValues('name')} נוסף בהצלחה`);
            else if (resp.status === 200 && method === "PUT")
                toast.success(`עמדה ${item.name} התעדכן בהצלחה`);
            else toast.error(resp.message);
            queryClient.invalidateQueries('outposts')
            setOpenDialog(false);
            reset();
        } catch (err) {
            console.error(`An error occurred while ${method}ing the עמדה:`, err);
            toast.error("יש בעיה, בבקשה נסה מאוחר יותר");
        }
    }

    const onSubForm = (formData) => {
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
                                max: { value: 10, message: "מקסימום 10 שומרים בעמדה" }
                            })}
                            color="primary"
                            size="small"
                            autoComplete="off"
                            label="מינימום שומרים בעמדה"
                            sx={{ marginTop: "8px" }}
                        />
                        <FormHelperText error={!!errors.minGuards}>
                            {errors.minGuards && errors?.minGuards?.message}
                        </FormHelperText>
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
}

