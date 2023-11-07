import  { useState } from "react";
import {
  Typography,
  Container,
  Button,
  Box,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import SelectCamp from "components/general_comps/selectCamp.jsx";
import GuardDialog from "components/guards/guardDialog/guardDialog.jsx";
import GuardList from "./guardsList/guardList";
import { useLocation } from "react-router-dom";
import { GuardDialogDelete } from "./guardDialog/guardDialogDelete/guardDialogDelete";
import BackLink from "../general_comps/backLink";


export default function GuardsPage() {
  let { state } = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMethod, setDialogMethod] = useState("POST"); // default to POST for adding new guards
  const [selectedGuardId, setSelectedGuardId] = useState(null);
  const [guardDetails, setGuardDetails] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [guardToDelete, setGuardToDelete] = useState(null);
  const [selectedCampId, setSelectedCampId] = useState(state?.campId || "");

  const handleOpenAddDialog = () => {
    setSelectedGuardId(null); // No guard is selected when adding a new one
    setDialogMethod("POST");
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (guard) => {
    setSelectedGuardId(guard.id);
    setDialogMethod("PUT");
    setGuardDetails(guard); // Set the selected guard's details
    setDialogOpen(true);
  };

  const handleOpenDeleteDialog = (guard) => {
    setGuardToDelete(guard);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setGuardToDelete(null); // Clear the selected guard when closing the dialog
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container sx={{ display: "grid", gap: 3, pt: 4 }}>
      <Typography variant="h3" component="h2" gutterBottom>
        ניהול סד"כ
      </Typography>
      <SelectCamp
        selectedCampId={selectedCampId}
        setSelectedCampId={setSelectedCampId}
        title="בחר מחנה: "
      />
      {/* TODO: <GuardsList dialogOpen={} />*/}
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button variant="contained" onClick={handleOpenAddDialog}>
          הוסף שומר
        </Button>
      </Box>
      <GuardList
        campId={selectedCampId}
        handleEdit={handleOpenEditDialog}
        handleDelete={handleOpenDeleteDialog}
      />
      {dialogOpen && (
        <GuardDialog
          open={dialogOpen}
          close={handleCloseDialog}
          guardId={selectedGuardId}
          campId={selectedCampId}
          method={dialogMethod}
          guardDetails={guardDetails}
        />
      )}
      {deleteDialogOpen && guardToDelete && (
        <GuardDialogDelete
          guard={guardToDelete}
          closeDialog={handleCloseDeleteDialog}
          open={deleteDialogOpen} // Pass the open state
        />
      )}
      <BackLink place="end" icon={<ArrowBackIosIcon />}>
        חזרה לרשימת הבסיסים
      </BackLink>
    </Container>
  );
}
