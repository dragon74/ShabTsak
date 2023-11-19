import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Button, Dialog, Autocomplete, TextField, CircularProgress, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { getOutpostsByCampId } from "@/services/OutpostService";
import { createGuardOutpostLimit, deleteOutpostLimit, getGuardOutpostLimitByGuardId } from "../../../services/OutpostLimitService";
import GuardOutpostLimitList from "./guardOutpostLimitList";
import { toast } from "react-toastify";

const OutpostLimit = ({ guardId, campId }) => {
  const queryClient = useQueryClient();

  const { data: outposts, isLoading: isLoadingOutposts } = useQuery({
    queryKey: ["outposts", campId],
    queryFn: () => getOutpostsByCampId(campId),
  });

  const { data: outpostLimits, isLoading: isLoadingOutpostLimits } = useQuery({
    queryFn: () => getGuardOutpostLimitByGuardId(guardId, campId),
    queryKey: ["outpostLimits", guardId, campId],
    enabled: !!guardId && !!campId,
  });

  const createGuardOutpostLimitMutation = useMutation((selectedOutpostId) => createGuardOutpostLimit(guardId, campId, selectedOutpostId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["outpostLimits", guardId, campId]);
      toast.success("מגבלת עמדה נוספה בהצלחה!");
      handleCloseDialog();
    },
    onError: () => toast.error("שגיאה בעת הוספת העמדה"),
  });

  const deleteGuardOutpostLimitMutation = useMutation((outpostLimitId) => deleteOutpostLimit(outpostLimitId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["outpostLimits", guardId, campId]);
      toast.success("מגבלת עמדה נמחקה בהצלחה!");
    },
    onError: () => toast.error("שגיאה בעת מחיקת העמדה"),
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
        const existingOutpostLimit = outpostLimits?.find((o) => o.outpostId === selectedOutpost.id);

        if (existingOutpostLimit) {
          toast.error("מגבלת עמדה כבר קיימת!");
          return;
        }

        await createGuardOutpostLimitMutation.mutate(selectedOutpost.id);
      } catch (error) {
        console.error("שגיאה בעת הוספת מגבלת עמדה:", error);
      }
    }
  };

  return (
    <>
      <div>
        <h2>מגבלות לפי עמדה:</h2>

        <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
          הוספה
        </Button>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>בחר עמדה</DialogTitle>
        <DialogContent>
          <Autocomplete options={outposts || []} getOptionLabel={(option) => option.name} loading={isLoadingOutposts} onChange={(event, newValue) => setSelectedOutpost(newValue)} renderInput={(params) => <TextField {...params} label="בחר עמדה" />} key={(option) => option.id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            ביטול
          </Button>
          <Button onClick={handleAdd} color="primary" disabled={!selectedOutpost}>
            {createGuardOutpostLimitMutation.isLoading ? <CircularProgress size={24} /> : "הוספה"}
          </Button>
        </DialogActions>
      </Dialog>

      <GuardOutpostLimitList guardId={guardId} campId={campId} outposts={outposts} outpostLimits={outpostLimits} handleDelete={deleteGuardOutpostLimitMutation.mutate} />
    </>
  );
};

export default OutpostLimit;
