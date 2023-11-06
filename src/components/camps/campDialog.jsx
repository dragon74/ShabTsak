import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormHelperText, ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";
import { useMemo } from "react";
import { createOrUpdateCamp } from "../../services/CampService";
import { useQueryClient } from "react-query";

CampDialog.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpenDialog: PropTypes.func.isRequired,
    method: PropTypes.oneOf(['PUT', 'POST']).isRequired,
    item: PropTypes.object
}

function CampDialog({ openDialog, setOpenDialog, method, item }) {

    // Access the client
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        defaultValues: {
            name: method === "PUT" ? item.name : "",
            ...(method === "PUT" && { id: item.id })
        }
    });

    const actionHebrew = useMemo(() => {
        if (method === "POST") return "הוסף";
        else if (method === "PUT") return "ערוך";
        else return method;
    }, [method]);


    const onSubForm = async(formData) => {
        await createOrUpdateCamp(formData, method, getValues, item);
        //  clear the shifts query 
        queryClient.invalidateQueries(['camps'])
        setOpenDialog(false);
        reset();
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

export default CampDialog;
