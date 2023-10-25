import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, MenuItem, Grid, Button, List, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, CircularProgress, Container, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { GuardItem } from "./GuardItem.jsx";
import ROUTES from "../../constants/routeConstants";
import { useParams, Link as RouterLink } from "react-router-dom";
import { API_URL, GUARD_URL } from "../../constants/apiConstants.js";

const GuardList = () => {
  const params = useParams();
  const [guards, setGuards] = useState([]);
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [camps, setCamps] = useState([]);
  const [selectedCampId, setSelectedCampId] = useState(params["id"] || "");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    shouldBeAllocated: true,
  });

  const handleOpenDialog = (guard) => {
    setSelectedGuard(guard);
    setFormState(guard || {});
    setDialogOpen(true);
  };

  useEffect(() => {
    if (selectedCampId) {
      axios
        .get(`${GUARD_URL}/camp/${selectedCampId}`)
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
      .get(API_URL + "/camp/all")
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
    const { name, value, type, checked } = e.target;

    // If the input is a checkbox, handle the "shouldBeAllocated" field specifically
    if (type === "checkbox") {
      setFormState((prev) => ({
        ...prev,
        shouldBeAllocated: checked,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
        .put(`${GUARD_URL}`, dataToSend)
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
        .post(GUARD_URL, dataToSend)
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
      .delete(`${GUARD_URL}/${guard.id}`)
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
    <Container sx={{ display: "grid", gap: 3, pt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ניהול סד"כ
      </Typography>
      <Grid item xs={12}>
        <TextField
          select
          label="בחר מחנה"
          onChange={(e) => setSelectedCampId(e.target.value)}
          value={!camps.length && selectedCampId ? "" : selectedCampId}
          fullWidth
          variant="outlined"
          SelectProps={{
            native: false,
            MenuProps: {
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
            },
          }}
        >
          <MenuItem value="" component={RouterLink} to={ROUTES.GUARDS}>
            <em>Select a camp</em>
          </MenuItem>
          {camps.map((camp) => (
            <MenuItem key={`camp_${camp.id}`} value={camp.id} component={RouterLink} to={ROUTES.GUARDS + ROUTES.CAMP + "/" + camp.id}>
              {camp.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {!selectedCampId ? (
        <Typography variant="body2">אנא בחר מחנה</Typography>
      ) : (
        <>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Button startIcon={<AddIcon />} variant="contained" color="primary" onClick={() => handleOpenDialog(null)}>
              הוספת שומר
            </Button>
          </Grid>
          <Grid item xs={12}>
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                <CircularProgress />
              </div>
            ) : (
              <List>
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                    <CircularProgress />
                  </div>
                ) : guards.length ? (
                  <Table sx={{ marginBottom: "15px", boxShadow: "0 3px 5px rgba(0,0,0,0.2)" }}>
                    <TableBody>
                      {guards.map((guard) => (
                        <GuardItem key={guard.id} guard={guard} onEdit={handleOpenDialog} onDelete={handleDelete} />
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography align="center">No guards available</Typography>
                )}
              </List>
            )}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={formState.shouldBeAllocated || false}
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    shouldBeAllocated: e.target.checked,
                  }));
                }}
                color="primary"
              />
            }
            label="Should be Allocated"
          />
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
    </Container>
  );
};

export default GuardList;
