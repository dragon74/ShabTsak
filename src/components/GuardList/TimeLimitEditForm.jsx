import { useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { API_URL } from "../../constants/apiConstants";

const TimeLimitEditForm = ({ timeLimit, onClose, onUpdate }) => {
  const [editedTimeLimit, setEditedTimeLimit] = useState(timeLimit);

  const handleSubmit = async () => {
    try {
      await axios.put(API_URL + `/guardtimelimit/${editedTimeLimit.id}`, editedTimeLimit);
      onUpdate(editedTimeLimit);
      onClose();
    } catch (error) {
      console.error("Error updating time limit:", error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Time Limit</DialogTitle>
      <DialogContent>
        <TextField label="From Hour" type="number" fullWidth value={editedTimeLimit.fromHour} onChange={(e) => setEditedTimeLimit({ ...editedTimeLimit, fromHour: Number(e.target.value) })} />
        <TextField label="To Hour" type="number" fullWidth value={editedTimeLimit.toHour} onChange={(e) => setEditedTimeLimit({ ...editedTimeLimit, toHour: Number(e.target.value) })} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TimeLimitEditForm;
