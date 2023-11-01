import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, Grid, Button, List, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, CircularProgress, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { GuardItem } from "./GuardItem.jsx";
import { useParams } from "react-router-dom";
import { GUARD_URL } from "../../constants/apiConstants.js";
import { toast } from "react-toastify";
import BackLink from "../general_comps/backLink";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SelectCamp from "../general_comps/selectCamp.jsx";
import {useQuery} from "react-query";
import GuardService from "@/services/GuardService.js";

const GuardList = () => {
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleOpenDialog = (guard) => {
    setSelectedGuard(guard);
    setFormState(guard || {});
    setDialogOpen(true);
  };

  const { data: guards } = useQuery({
    queryKey: ["guards", selectedCampId],
    queryFn: () => GuardService.getGuardsByCampId(selectedCampId),
    enabled: !!selectedCampId,
    initialData: []
  })

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedGuard(null);
  };

const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === "checkbox") {
    setFormState((prev) => ({
      ...prev,
      [name]: checked, // This line ensures the 'shouldBeAllocated' field is updated
    }));
  } else {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  // Validation functions
  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const isValidName = (name) => {
    // Name should be longer than 1 character, not be empty,
    // and shouldn't contain numbers or special characters
    const regex = /^[a-zA-Zא-ת\s]{2,}$/; // Hebrew characters are included and at least 2 characters long
    return name && regex.test(name.trim()); // Ensure name is not empty or just whitespace
  };

  const isValidPhone = (phone) => {
    // Only numbers and 10 digits long (change according to your country's standards)
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const handleSave = () => {
    setLoading(true);

    if (!isValidEmail(formState.mail)) {
      toast.error("Invalid email address!");
      setLoading(false);
      return;
    }

    if (!isValidName(formState.name)) {
      toast.error("Invalid name! Name should be at least 2 characters long and should contain only letters.");
      setLoading(false);
      return;
    }

    if (!isValidPhone(formState.phone)) {
      toast.error("Invalid phone number! It should be 10 digits long."); // Adjust the message if you have different criteria
      setLoading(false);
      return;
    }

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
            toast.success("Guard updated successfully!");
          }
        })
        .catch((error) => {
          console.error("Failed to update the guard:", error);
          toast.error("Failed to update the guard!");
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
            toast.success("Guard added successfully!");
          }
        })
        .catch((error) => {
          console.error("Failed to create the guard:", error);
          toast.error("Failed to add a new guard!");
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
          toast.success("Guard deleted successfully!");
        } else {
          console.error("Unexpected response status:", response.status);
          toast.warn("Unexpected response when deleting the guard!");
        }
      })
      .catch((error) => {
        console.error("Failed to delete the guard:", error);
        toast.error("Failed to delete the guard!");
      });
    setLoading(false);
  };

  return (
    <Container sx={{ display: "grid", gap: 3, pt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ניהול סד"כ
      </Typography>
      <SelectCamp
        selectedCampId={selectedCampId}
        setSelectedCampId={setSelectedCampId}
        title="בחר מחנה" 
      />

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
                onChange={handleInputChange}
                name="shouldBeAllocated" // Ensure you have this name property set
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
      <BackLink place="end" icon={<ArrowBackIosIcon />}>
        חזרה לרשימת הבסיסים
      </BackLink>
    </Container>
  );
};

export default GuardList;
