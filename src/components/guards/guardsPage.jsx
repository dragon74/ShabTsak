import React, { useState } from "react";
import { Typography, Container, Button } from "@mui/material";
import SelectCamp from "components/general_comps/selectCamp.jsx";
import GuardDialog from "components/guards/guardDialog/guardDialog.jsx";
import { useParams, useNavigate } from "react-router-dom";
import GuardList from "./guardsList/guardList";

export default function GuardsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMethod, setDialogMethod] = useState("POST"); // default to POST for adding new guards
  const [selectedGuardId, setSelectedGuardId] = useState(null);
  // TODO: Fetch outside or inside the list? Create / Edit (Guard or Initial) (method: POST / PUT) (guard details?)
  // const [selectedGuardId, setSelectedGuardId] = useState(null); TODO: Is this the best way ?
  const [selectedCampId, setSelectedCampId] = useState(params["id"] || "");

     const handleOpenAddDialog = () => {
       setSelectedGuardId(null); // No guard is selected when adding a new one
       setDialogMethod("POST");
       setDialogOpen(true);
     };

     const handleOpenEditDialog = (guardId) => {
       setSelectedGuardId(guardId); // Set the selected guard's ID when editing
       setDialogMethod("PUT");
       setDialogOpen(true);
     };

     const handleCloseDialog = () => {
       setDialogOpen(false);
     };

  // Update the selectedCampId state and navigate to the new URL
  const handleCampChange = (newCampId) => {
    setSelectedCampId(newCampId);
    navigate(`/guards/camp/${newCampId}`); // Change the URL
  };

  return (
    <Container sx={{ display: "grid", gap: 3, pt: 4 }}>
      <Typography variant="h3" component="h2" gutterBottom>
        ניהול סד"כ
      </Typography>
      <SelectCamp selectedCampId={selectedCampId} setSelectedCampId={handleCampChange} title="בחר מחנה: " />
      {/* TODO: <GuardsList dialogOpen={} />*/}
      <Button onClick={handleOpenAddDialog}>Add Guard</Button>
      <GuardList handleEdit={handleOpenEditDialog} />
      {dialogOpen && <GuardDialog open={dialogOpen} close={handleCloseDialog} guardId={selectedGuardId} method={dialogMethod} />}
      {/* <GuardDialog open={dialogOpen} guardId={0} method={"POST"} close={() => setDialogOpen(false)} /> */}
    </Container>
  );
}
