import { useMutation, useQueryClient } from "react-query";
import GuardService from "@/services/GuardService";
import GuardType from "@/types/Guard.type";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export const GuardDialogDelete = ({ guard, closeDialog, open }) => {
const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => GuardService.deleteGuard(guard.id),
    onSuccess: () => {
      queryClient.invalidateQueries("guards");
      toast.success("שומר נמחק בהצלחה!");
      closeDialog();
    },
    onError: () => toast.error("Failed to delete"),
  });

  return (
    <Dialog open={open} onClose={closeDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          closeDialog();
        }}
        sx={{ px: 2, py: 1 }}
      >
        <DialogTitle id="alert-dialog-title">{`האם ברצונך למחוק את השומר ${guard.name}?`}</DialogTitle>
        <DialogContent>{/* You can add more content here if needed */}</DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            ביטול
          </Button>
          <Button onClick={() => mutation.mutate()} color="primary" autoFocus variant="contained">
            מחק
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

GuardDialogDelete.propTypes = {
  guard: PropTypes.object.isRequired,
  closeDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
