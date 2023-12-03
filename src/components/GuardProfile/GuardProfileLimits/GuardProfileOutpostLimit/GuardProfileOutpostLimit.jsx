import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Button,
  Dialog,
  Autocomplete,
  TextField,
  CircularProgress,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack, IconButton
} from "@mui/material";
import { getOutpostsByCampId } from "@/services/outpostService.js";
import { createGuardOutpostLimit, deleteOutpostLimit, getGuardOutpostLimitByGuardId } from "@/services/outpostLimitService.js";
import GuardProfileOutpostLimitTable from "./GuardProfileOutpostLimitTable/GuardProfileOutpostLimitTable.jsx";
import { toast } from "react-toastify";
import {AddBox, HdrPlus, PlusOneRounded} from "@mui/icons-material";

const GuardProfileOutpostLimit = ({ guardId, campId }) => {
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
    setSelectedOutpost(null);
  };

  const handleAdd = async () => {
    if (!selectedOutpost) {
      toast.error("אנא בחר עמדה להוספה.");
      return;
    }

    try {
      const existingOutpostLimit = outpostLimits?.find((o) => o.outpostId === selectedOutpost.id);

      if (existingOutpostLimit) {
        toast.error("מגבלת עמדה כבר קיימת!");
        return;
      }

      await createGuardOutpostLimitMutation.mutate(selectedOutpost.id);
      setSelectedOutpost(null);
    } catch (error) {
      console.error("שגיאה בעת הוספת מגבלת עמדה:", error);
    }
  };

  if (isLoadingOutpostLimits || isLoadingOutposts) {
    return <Typography align="center">טוען מידע...</Typography>;
  }

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Typography variant="h5" width={80}>
          לפי עמדה:
        </Typography>
        <IconButton type="button" size="small" color="primary" variant="outlined" onClick={handleOpenDialog}>
          <AddBox />
        </IconButton>
      </Stack>

      <Dialog
        PaperProps={{
          style: {
            minWidth: "300px", // Set your minimum width here
            maxWidth: "90vw", // Set a maximum width (e.g., 90% of viewport width)
          },
        }}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>בחר עמדה</DialogTitle>
        <DialogContent>
          <Autocomplete sx={{ paddingTop: 1 }} options={outposts || []} getOptionLabel={(option) => option.name} loading={isLoadingOutposts} onChange={(event, newValue) => setSelectedOutpost(newValue)} renderInput={(params) => <TextField {...params} label="בחר עמדה" />} key={(option) => option.id} />
        </DialogContent>
        <DialogActions sx={{ marginInlineEnd: 2, marginBlockEnd: 1 }}>
          <Button onClick={handleCloseDialog} color="primary">
            ביטול
          </Button>
          <Button variant="contained" onClick={handleAdd} color="primary">
            {createGuardOutpostLimitMutation.isLoading ? <CircularProgress size={24} /> : "הוספה"}
          </Button>
        </DialogActions>
      </Dialog>

      <GuardProfileOutpostLimitTable guardId={guardId} campId={campId} outposts={outposts} outpostLimits={outpostLimits} handleDelete={deleteGuardOutpostLimitMutation.mutate} />
    </>
  );
};

export default GuardProfileOutpostLimit;
