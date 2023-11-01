import { useState } from "react";
import axios from "axios";
import { Grid, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Dialog, DialogActions } from "@mui/material";
import { API_URL } from "../../constants/apiConstants";
import { toast } from "react-toastify";

const TimeLimitForm = ({ id, fetchTimeLimits, timeLimits }) => {
  const initialTimeLimit = {
    dayId: 0,
    fromHour: 0,
    toHour: 0,
    guardId: Number(id),
  };
  const [newTimeLimit, setNewTimeLimit] = useState(initialTimeLimit);
  const [open, setOpen] = useState(false);

  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (newTimeLimit.fromHour >= newTimeLimit.toHour) {
      toast.warn("End time should be after start time!");
      return;
    }

    // Check for duplicates
    const isDuplicate = timeLimits.some((limit) => limit.dayId === newTimeLimit.dayId && limit.fromHour === newTimeLimit.fromHour && limit.toHour === newTimeLimit.toHour);

    if (isDuplicate) {
      toast.warn("This time limit already exists!");
      return;
    }

    try {
      await axios.post(API_URL + "/guardtimelimit", newTimeLimit);
      fetchTimeLimits();
      toast.success("Time limit added successfully.");
      handleClose(); // Close the dialog after successful submission
      setNewTimeLimit(initialTimeLimit); // Reset the form data
    } catch (error) {
      console.error("Error creating new time limit:", error);
      toast.error("Failed to add new time limit. Please try again.");
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Time Limit
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <Box mt={4}>
          <Typography variant="h6" component="h3" gutterBottom>
            הוספת מגבלת זמן
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>יום</InputLabel>
                <Select value={newTimeLimit.dayId} onChange={(e) => setNewTimeLimit((prev) => ({ ...prev, dayId: Number(e.target.value) }))}>
                  {days.map((day, index) => (
                    <MenuItem key={index} value={index}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="משעה"
                type="number"
                fullWidth
                value={String(newTimeLimit.fromHour).padStart(2, "0")}
                onChange={(e) => setNewTimeLimit((prev) => ({ ...prev, fromHour: Number(e.target.value) }))}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  pattern: "[0-9]{2}",
                  min: 0,
                  max: 23,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="עד שעה"
                type="number"
                fullWidth
                value={String(newTimeLimit.toHour).padStart(2, "0")}
                onChange={(e) => setNewTimeLimit((prev) => ({ ...prev, toHour: Number(e.target.value) }))}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  pattern: "[0-9]{2}",
                  min: 0,
                  max: 23,
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            הוספה
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TimeLimitForm;
