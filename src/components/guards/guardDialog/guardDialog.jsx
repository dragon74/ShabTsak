import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { guardDialogDefaults } from "components/guards/guardDialog/guardDialogDefaults.js";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { guardDialogSchema } from "components/guards/guardDialog/guardDialogSchema.js";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Checkbox,
    FormControlLabel, Typography
} from "@mui/material";

export default function GuardDialog({ guardId, method, open, close }) {
    const { id: campId } = useParams();
    console.log(guardId, campId, method);
    const { handleSubmit, register, control, reset, formState } = useForm({
        defaultValues: guardDialogDefaults,
        resolver: yupResolver(guardDialogSchema)
    })
    function submit(formData) {
        console.log(formData);
    }

    function handleCloseDialog() {
        reset();
        close();
    }

    const isEditing = method === "PUT";

    return (
        <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit(submit)} sx={{ px: 2, py: 1 }}>
                <DialogTitle>{isEditing ? "ערוך שומר" : "הוסף שומר"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{isEditing ? "ערוך את פרטי השומר :" : "הזן את פרטי השומר :"}</DialogContentText>
                    <TextField autoFocus margin="dense" label="שם" type="text" fullWidth {...register("name")} helperText={<Typography display="inline" color="error" fontSize={12}>{formState.errors?.name?.message}</Typography>} />
                    <TextField margin="dense" label="אימייל" type="email" fullWidth {...register("mail")} helperText={<Typography display="inline" color="error">{formState.errors?.mail?.message}</Typography>} />
                    <TextField margin="dense" label="טלפון" type="text" fullWidth {...register("phone")} helperText={<Typography display="inline" color="error">{formState.errors?.phone?.message}</Typography>} />
                    <FormControlLabel
                        control={
                            <Controller control={control} name="shouldBeAllocated" render={({ field }) => {
                                return (
                                    <Checkbox
                                        {...field}
                                        checked={field.value}
                                        color="primary"
                                    />
                                )
                            }} />
                        }
                        label="Should be Allocated"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        ביטול
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        {isEditing ? "ערוך" : "שמור"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
    // return (
    //     <Dialog open={open}>
    //         <Box component="form" onSubmit={handleSubmit(submit)}>
    //             <Stack>
    //                 <TextField {...register("name")} />
    //                 <TextField {...register("mail")} />
    //                 <TextField {...register("phone")} />
    //             </Stack>
    //             <FormControl>
    //                 <InputLabel>מסכים כפרה?</InputLabel>
    //                 <Checkbox {...register("shouldBeAllocated")} />
    //             </FormControl>
    //             <Button type="submit">כשדגכדג</Button>
    //         </Box>
    //     </Dialog>
    // )
}

GuardDialog.propTypes = {
    guardId: PropTypes.number.isRequired,
    method: PropTypes.oneOf(["PUT", "POST", "DELETE"]).isRequired,
    open: PropTypes.bool,
    close: PropTypes.close
}