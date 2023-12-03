import {useState} from "react";
import {
    Typography,
    Button,
    TextField,
    MenuItem,
    FormControl,
    Box,
    Dialog,
    DialogActions,
    Stack, DialogContent, DialogTitle, IconButton
} from "@mui/material";
import {toast} from "react-toastify";
import {createTimeLimit} from "@/services/timeLimitService.js";
import {useQueryClient} from "react-query";
import {AddBox} from "@mui/icons-material";

const GuardProfileTimeLimitForm = ({id, timeLimits}) => {
    const initialTimeLimit = {
        dayId: 0,
        fromHour: 0,
        toHour: 0,
        guardId: Number(id),
    };
    const [newTimeLimit, setNewTimeLimit] = useState(initialTimeLimit);
    const [open, setOpen] = useState(false);

    const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

    const queryClient = useQueryClient();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        if (newTimeLimit.fromHour >= newTimeLimit.toHour) {
            toast.warn("שעת התחלה חייבת להיות פחותה משעת סיום");
            return;
        }

        // Check for duplicates
        const isDuplicate = timeLimits.some((limit) => limit.dayId === newTimeLimit.dayId && limit.fromHour === newTimeLimit.fromHour && limit.toHour === newTimeLimit.toHour);

        if (isDuplicate) {
            toast.warn("This time limit already exists!");
            return;
        }

        await createTimeLimit(newTimeLimit);
        queryClient.invalidateQueries(["guardTimeLimits"]);
        setOpen(false);
    };

    return (
        <div>
            <Stack direction="row" alignItems="center">
                <Typography variant="h5" width={80}>
                    לפי שעות:
                </Typography>
                <IconButton type="button" size="small" color="primary" variant="outlined" onClick={handleOpen}>
                    <AddBox />
                </IconButton>
            </Stack>

            <Dialog open={open} onClose={handleClose} PaperProps={{
                style: {
                    minWidth: "300px", // Set your minimum width here
                    maxWidth: "90vw", // Set a maximum width (e.g., 90% of viewport width)
                },
            }}>
                <DialogTitle variant="h6" sx={{ paddingBottom: 0 }}>
                    {/*<Typography variant="h6" component="h3" gutterBottom>*/}
                        הוספת מגבלת זמן
                    {/*</Typography>*/}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}  sx={{ paddingTop: 1 }}>
                        <FormControl>
                            <TextField select label="יום" value={newTimeLimit.dayId}
                                    onChange={(e) => setNewTimeLimit((prev) => ({
                                        ...prev,
                                        dayId: Number(e.target.value)
                                    }))}>
                                {days.map((day, index) => (
                                    <MenuItem key={index} value={index}>
                                        {day}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <TextField
                                label="משעה"
                                type="number"
                                fullWidth
                                value={String(newTimeLimit.fromHour).padStart(2, "0")}
                                onChange={(e) => setNewTimeLimit((prev) => ({
                                    ...prev,
                                    fromHour: Number(e.target.value)
                                }))}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    pattern: "[0-9]{2}",
                                    min: 0,
                                    max: 23,
                                }}
                            />
                            <TextField
                                label="עד שעה"
                                type="number"
                                fullWidth
                                value={String(newTimeLimit.toHour).padStart(2, "0")}
                                onChange={(e) => setNewTimeLimit((prev) => ({...prev, toHour: Number(e.target.value)}))}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    pattern: "[0-9]{2}",
                                    min: 0,
                                    max: 23,
                                }}
                            />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ paddingInlineEnd: 3, paddingBlockEnd: 2 }}>
                    <Button onClick={handleClose}>ביטול</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        הוספה
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GuardProfileTimeLimitForm;
