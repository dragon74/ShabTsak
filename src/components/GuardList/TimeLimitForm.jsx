import { useState } from "react";
import axios from "axios";
import { Grid, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import { getDayName } from "./utils";
import { API_URL } from "../../constants/apiConstants";

const TimeLimitForm = ({ id, fetchTimeLimits }) => {
  const [newTimeLimit, setNewTimeLimit] = useState({
    dayId: 0,
    fromHour: 0,
    toHour: 0,
    guardId: Number(id),
  });

  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

  const handleSubmit = async () => {
    if (newTimeLimit.fromHour >= newTimeLimit.toHour) {
      alert("End time should be after start time!");
      return;
    }
    try {
      await axios.post(API_URL + "/guardtimelimit", newTimeLimit);
      fetchTimeLimits();
    } catch (error) {
      console.error("Error creating new time limit:", error);
    }
  };

  return (
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
        <Grid item xs={12} sm={2}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            הוספה
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimeLimitForm;
