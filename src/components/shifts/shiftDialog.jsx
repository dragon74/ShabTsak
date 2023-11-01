import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { useQueryClient } from 'react-query';
import { DialogTitle, DialogContent, DialogActions, Button, FormHelperText, ThemeProvider, Select, MenuItem, Dialog, InputLabel, Grid } from "@mui/material";
import { theme } from "@/theme/theme";
import { useParams } from 'react-router-dom';
import { createOrUpdateShift } from "@/services/ShiftService";

function ShiftDialog({ openDialog, setOpenDialog, method, item }) {
    const queryClient = useQueryClient();
    const params = useParams();
    const outpostId = params["id"];

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        defaultValues: {
            dayId: method === "PUT" ? item.dayId : '',
            fromHour: method === "PUT" ? item.fromHour : '',
            toHour: method === "PUT" ? item.toHour : '',
            outpostId,
            ...(method === "PUT" && { id: item.id })
        }
    });

    const actionHebrew = useMemo(() => {
        if (method === "POST") return "הוסף";
        else if (method === "PUT") return "ערוך";
        else return method;
    }, [method]);

    const onSubForm = (formData) => {
        createOrUpdateShift(formData, method, getValues, item, reset, setOpenDialog, queryClient);
        console.log(formData);
    }
    const hourArr = Array.from({ length: 24 }, (_, index) => {
        const hour = (index + 1).toString();
        return `${hour}`;
    });
    const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת',];

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                onClose={() => setOpenDialog(false)}
                open={openDialog}
                PaperProps={{
                    style: {
                        minWidth: '300px', // Set your minimum width here
                        maxWidth: '90vw',  // Set a maximum width (e.g., 90% of viewport width)
                        padding: "20px"
                    }
                }}
            >
                <DialogTitle>{actionHebrew} משמרת יום {item ? item.dayId : ""}</DialogTitle>
                <form onSubmit={handleSubmit(onSubForm)}>
                    <DialogContent style={{ padding: '10px 20px' }}>
                        <InputLabel id="select-label-days">יום בשבוע</InputLabel>
                        <Select
                            fullWidth
                            labelId="select-label-days"
                            id="demo-simple-select"
                            {...register('dayId', { required: { value: true, message: 'חובה למלא יום בשבוע' } })}
                            defaultValue={1} // Set this value to the default hour you want
                            label="יום בשבוע"
                        >
                            {daysOfWeek.map((day, index) => (
                                <MenuItem sx={{ textAlign: 'center' }} key={index + 1} value={index + 1}>
                                    {day}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText error={!!errors.dayId}>
                            {errors.dayId && errors?.dayId?.message}
                        </FormHelperText>


                        <Grid container spacing={2}>
                            <Grid item>
                                <InputLabel id="select-label-fromHour">משעה</InputLabel>
                                <Select
                                    labelId="select-label-fromHour"
                                    id="demo-simple-select"
                                    sx={{ textAlign: 'center' }}
                                    {...register('fromHour', { required: { value: true, message: 'חובה למלא שעה' } })}
                                    label="משעה"
                                    defaultValue={5} 
                                >
                                    {hourArr.map((hour, index) => (
                                        <MenuItem sx={{ textAlign: 'center' }} key={index} value={hour}>
                                            {hour}:00
                                        </MenuItem>
                                    ))}
                                </Select >
                                <FormHelperText error={!!errors.fromHour}>
                                    {errors.fromHour && errors?.fromHour?.message}
                                </FormHelperText>
                            </Grid >
                            <Grid item>
                                <InputLabel id="select-label-fromHour">עד שעה</InputLabel>
                                <Select
                                    labelId="select-label-fromHour"
                                    id="demo-simple-select"
                                    sx={{ textAlign: 'center' }}
                                    {...register('toHour', { required: { value: true, message: 'חובה למלא שעה' } })}
                                    label="עד שעה"
                                    defaultValue={8} 
                                >
                                    {hourArr.map((hour, index) => (
                                        <MenuItem sx={{ textAlign: 'center' }} key={index} value={hour}>
                                            {hour}:00
                                        </MenuItem>
                                    ))}
                                </Select >
                                <FormHelperText error={!!errors.toHour}>
                                    {errors.toHour && errors?.toHour?.message}
                                </FormHelperText>
                            </Grid >
                        </Grid >


                        {/* Add more TextFields and form fields here as needed */}
                    </DialogContent >
                    <DialogActions>
                        <Button type="button"
                            onClick={() => setOpenDialog(false)}
                            style={{ marginLeft: '8px' }}>
                            ביטול
                        </Button>
                        <Button type="submit">{actionHebrew}</Button>
                    </DialogActions>
                </form >
            </Dialog >
        </ThemeProvider >
    );
}

ShiftDialog.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpenDialog: PropTypes.func.isRequired,
    method: PropTypes.oneOf(['PUT', 'POST']).isRequired,
    item: PropTypes.object
}
export default ShiftDialog;
