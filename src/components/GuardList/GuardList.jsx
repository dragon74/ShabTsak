import React, { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem, Grid, Button, List, ListItemText, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography, Avatar, Card, CardContent, CardActions, Snackbar, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import md5 from "md5";
import { Container } from "@mui/system";

const API_URL = "https://shabtsak.onrender.com/guard";

const GuardItem = ({ guard, onEdit, onDelete }) => (
  <Card key={guard.id} variant="outlined" style={{ marginBottom: "10px" }}>
    <CardContent>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={2}>
          <Avatar src={getGravatarUrl(guard.mail)} alt={guard.name} />
        </Grid>
        <Grid item xs={7}>
          <ListItemText primary={guard.name} secondary={`Email: ${guard.mail} | Phone: ${guard.phone}`} />
        </Grid>
        <Grid item xs={3}>
          <CardActions>
            <IconButton onClick={() => onEdit(guard)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(guard)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

function getGravatarUrl(email) {
  const base = "https://www.gravatar.com/avatar/";
  const formattedEmail = (email || "").trim().toLowerCase();
  const hash = md5(formattedEmail);
  return `${base}${hash}?d=identicon`;
}

export const GuardList = () => {
  const [guards, setGuards] = useState([]);
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formState, setFormState] = useState({});
  const [camps, setCamps] = useState([]);
  const [selectedCampId, setSelectedCampId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenDialog = (guard) => {
    setSelectedGuard(guard);
    setFormState(guard || {});
    setDialogOpen(true);
  };

  useEffect(() => {
    if (selectedCampId) {
      axios
        .get(`${API_URL}/camp/${selectedCampId}`)
        .then((response) => {
          setGuards(response.data);
        })
        .catch((error) => {
          console.error("Error fetching guards for selected camp:", error);
        });
    }
  }, [selectedCampId]);

  useEffect(() => {
    axios
      .get("https://shabtsak.onrender.com/camp/all")
      .then((response) => {
        setCamps(response.data);
      })
      .catch((error) => {
        console.error("Error fetching camps:", error);
      });
  }, []);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedGuard(null);
  };

  const handleInputChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    setLoading(true);

    const dataToSend = {
      ...formState,
      campId: parseInt(selectedCampId),
    };

    if (selectedGuard) {
      // Existing guard: PUT request
      axios
        .put(`${API_URL}`, dataToSend)
        .then((response) => {
          if (response.status === 200) {
            setGuards((prev) => prev.map((g) => (g.id === formState.id ? dataToSend : g)));
            handleCloseDialog();
          }
        })
        .catch((error) => {
          console.error("Failed to update the guard:", error);
        });
    } else {
      // New guard: POST request
      axios
        .post(API_URL, dataToSend)
        .then((response) => {
          if (response.status === 201) {
            const newGuard = { ...dataToSend, id: response.data.id };
            setGuards((prev) => [...prev, newGuard]);
            handleCloseDialog();
          }
        })
        .catch((error) => {
          console.error("Failed to create the guard:", error);
        });
    }
    setLoading(false);
  };

  const handleDelete = (guard) => {
    setLoading(true);

    axios
      .delete(`${API_URL}/${guard.id}`)
      .then((response) => {
        if (response.status === 200) {
          setGuards((prev) => prev.filter((g) => g.id !== guard.id));
        } else {
          console.error("Unexpected response status:", response.status);
        }
      })
      .catch((error) => {
        console.error("Failed to delete the guard:", error);
      });
    setLoading(false);
  };

  return (
    <Container>
      <Grid container spacing={3} direction="column">
        <Typography variant="h4" gutterBottom>
          ניהול סד"כ
        </Typography>
        <Grid item xs={12}>
          <TextField select label="בחר מחנה" value={selectedCampId || ""} onChange={(e) => setSelectedCampId(e.target.value)} fullWidth variant="outlined">
            {camps.map((camp) => (
              <MenuItem key={camp.id} value={camp.id}>
                {camp.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {selectedCampId && (
          <>
            <Grid item xs={12} style={{ textAlign: "right" }}>
              <Button startIcon={<AddIcon />} variant="contained" color="primary" onClick={() => handleOpenDialog(null)}>
                הוספה שומר
              </Button>
            </Grid>
            <Grid item xs={12}>
              {loading ? <CircularProgress /> : <List>{guards.length ? guards.map((guard) => <GuardItem key={guard.id} guard={guard} onEdit={handleOpenDialog} onDelete={handleDelete} />) : <Typography>No guards available</Typography>}</List>}
            </Grid>
          </>
        )}

        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>{selectedGuard ? "ערוך שומר" : "הוסף שומר"}</DialogTitle>
          <DialogContent>
            <DialogContentText>{selectedGuard ? "ערוך את פרטי השומר :" : "הזן את פרטי השומר :"}</DialogContentText>
            <TextField autoFocus margin="dense" name="name" label="שם" type="text" fullWidth value={formState.name || ""} onChange={handleInputChange} />
            <TextField margin="dense" name="mail" label="אימייל" type="email" fullWidth value={formState.mail || ""} onChange={handleInputChange} />
            <TextField margin="dense" name="phone" label="טלפון" type="text" fullWidth value={formState.phone || ""} onChange={handleInputChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              ביטול
            </Button>
            <Button onClick={handleSave} color="primary">
              שמירה
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
      </Grid>
    </Container>
  );
};

export default GuardList;
