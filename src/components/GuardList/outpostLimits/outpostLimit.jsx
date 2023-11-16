import { useState } from "react";
import { useQuery } from "react-query";
import { Button, Dialog, Autocomplete, TextField } from "@mui/material";
import { getOutpostsByCampId } from "@/services/OutpostService";
import { createGuardOutpostLimit } from "../../../services/OutpostLimitService";
import GuardOutpostLimitList from "./outpostLimitList";

const OutpostLimit = ({ guardId, campId }) => {
  const { data: outposts, isLoading } = useQuery({
    queryKey: ["outposts", campId],
    queryFn: () => getOutpostsByCampId(campId),
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOutpost, setSelectedOutpost] = useState(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAdd = async () => {
    if (selectedOutpost) {
      try {
        createGuardOutpostLimit(guardId, campId, selectedOutpost.id);
        handleCloseDialog();
      } catch (error) {
        console.error("Error creating guard outpost limit:", error);
      }
    }
  };

  return (
    <>
      <div>
        <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
          ADD
        </Button>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Autocomplete
          options={outposts || []}
          getOptionLabel={(option) => option.name}
          loading={isLoading}
          onChange={(event, newValue) => setSelectedOutpost(newValue)}
          renderInput={(params) => <TextField {...params} label="Select Outpost" />}
          // Add the key prop to ensure uniqueness
          key={(option) => option.id}
        />

        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary" disabled={!selectedOutpost}>
          Add
        </Button>
      </Dialog>

      <GuardOutpostLimitList campId={campId} guardId={guardId} outposts={outposts} />
    </>
  );
};

export default OutpostLimit;
