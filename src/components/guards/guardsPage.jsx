import { useState } from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SelectCamp from "@/components/general_comps/selectCamp";
import GuardDialog from "@/components/guards/guardDialog/guardDialog";
import GuardList from "./guardsList/guardList";
import { GuardDialogDelete } from "./guardDialog/guardDialogDelete/guardDialogDelete";
import BackLink from "../general_comps/backLink";
import { useLocation } from "react-router-dom";

const GuardsPage = () => {
  const { state } = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMethod, setDialogMethod] = useState("POST");
  const [selectedGuardId, setSelectedGuardId] = useState(null);
  const [guardDetails, setGuardDetails] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [guardToDelete, setGuardToDelete] = useState(null);
  const [selectedCampId, setSelectedCampId] = useState(state?.campId || "");

  const handleOpenAddDialog = () => {
    setSelectedGuardId(null);
    setDialogMethod("POST");
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (guard) => {
    setSelectedGuardId(guard.id);
    setDialogMethod("PUT");
    setGuardDetails(guard);
    setDialogOpen(true);
  };

  const handleOpenDeleteDialog = (guard) => {
    setGuardToDelete(guard);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setGuardToDelete(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        ניהול סד"כ
      </Typography>
      <SelectCamp selectedCampId={selectedCampId} setSelectedCampId={setSelectedCampId} title="בחר מחנה: " />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Button variant="contained" onClick={handleOpenAddDialog}>
          הוסף שומר
        </Button>
      </Box>
      <GuardList campId={+selectedCampId} handleEdit={handleOpenEditDialog} handleDelete={handleOpenDeleteDialog} />
      {dialogOpen && <GuardDialog open={dialogOpen} close={handleCloseDialog} guardId={selectedGuardId} campId={selectedCampId} method={dialogMethod} guardDetails={guardDetails} />}
      {deleteDialogOpen && guardToDelete && <GuardDialogDelete guard={guardToDelete} closeDialog={handleCloseDeleteDialog} open={deleteDialogOpen} />}
      <BackLink place="end" icon={<ArrowBackIosIcon />}>
        חזרה לרשימת הבסיסים
      </BackLink>
    </Container>
  );
};

export default GuardsPage;
