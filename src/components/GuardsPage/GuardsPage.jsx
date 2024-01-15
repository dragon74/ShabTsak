import { useState } from "react";
import { Container, Button, Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SelectCamp from "@/components/general_comps/SelectCamp";
import GuardDialogAddOrEdit from "@/components/GuardsPage/Guards/Guard/GuardDialogAddOrEdit/GuardDialogAddOrEdit";
import Guards from "@/components/GuardsPage/Guards/Guards";
import { GuardDialogDelete } from "@/components/GuardsPage/Guards/Guard/GuardDialogDelete/GuardDialogDelete";
import BackLink from "@/components/general_comps/BackLink";
import { useLocation } from "react-router-dom";
import ROUTES from "@/constants/routeConstants";

const GuardsPage = () => {
  const { state } = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMethod, setDialogMethod] = useState("POST");
  const [selectedGuardId, setSelectedGuardId] = useState(null);
  const [guardDetails, setGuardDetails] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [guardToDelete, setGuardToDelete] = useState(null);
  const [selectedCampId, setSelectedCampId] = useState(state?.campId);

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
      <SelectCamp selectedCampId={selectedCampId} setSelectedCampId={setSelectedCampId} title="לוח שומרים" title2={"בבסיס:"} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        {selectedCampId && (
          <Button variant="contained" onClick={handleOpenAddDialog}>
            הוסף שומר
          </Button>
        )}
      </Box>
      {selectedCampId && <Guards campId={+selectedCampId} handleEdit={handleOpenEditDialog} handleDelete={handleOpenDeleteDialog} />}
      {dialogOpen && <GuardDialogAddOrEdit open={dialogOpen} close={handleCloseDialog} guardId={selectedGuardId} campId={selectedCampId} method={dialogMethod} guardDetails={guardDetails} />}
      {deleteDialogOpen && guardToDelete && <GuardDialogDelete guard={guardToDelete} closeDialog={handleCloseDeleteDialog} open={deleteDialogOpen} />}
      <BackLink to={ROUTES.HOME} place="end" icon={<ArrowBackIosIcon />}>
        חזרה לרשימת הבסיסים
      </BackLink>
    </Container>
  );
};

export default GuardsPage;
