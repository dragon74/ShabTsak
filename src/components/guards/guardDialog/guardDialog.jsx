import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { guardDialogDefaults } from "components/guards/guardDialog/guardDialogDefaults.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { guardDialogSchema } from "components/guards/guardDialog/guardDialogSchema.js";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import GuardService from "../../../services/GuardService";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

export default function GuardDialog({
  guardDetails,
  campId,
  method,
  open,
  close,
}) {
  const queryClient = useQueryClient();
  const isEditing = method === "PUT";

  const { handleSubmit, register, control, reset, formState } = useForm({
    defaultValues: isEditing ? { ...guardDetails, campId } : { campId },
    resolver: yupResolver(guardDialogSchema),
  });

  const submit = async (formData) => {
    try {
      if (isEditing) {
        // Call updateGuard if it's an edit operation
        await GuardService.updateGuard(formData);
        toast.success("Guard updated successfully!");
      } else {
        // Call addNewGuard if it's an add operation      
        reset(); // Reset the form to the initial default values.
        await GuardService.addNewGuard(formData);
        toast.success("Guard added successfully!");
      }

      // Invalidate and refetch guard-related queries to update the UI
      queryClient.invalidateQueries(["guards", campId]);

      // Close the dialog
      close();
      reset(); // Reset the form to the initial default values.
    } catch (error) {
      // Handle the error
      toast.error("Failed to process the guard data!");
      console.error("Error processing guard data:", error);
    }
  };

  // Function to handle closing the dialog.
  function handleCloseDialog() {
    close();
    reset(); // Reset the form to the initial default values.
  }

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(submit)}
        sx={{ px: 2, py: 1 }}
      >
        <DialogTitle>{isEditing ? "ערוך שומר" : "הוסף שומר"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEditing ? "ערוך את פרטי השומר :" : "הזן את פרטי השומר :"}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="שם"
            type="text"
            fullWidth
            {...register("name")}
            helperText={
              <Typography display="inline" color="error" fontSize={12}>
                {formState.errors?.name?.message}
              </Typography>
            }
          />
          <TextField
            margin="dense"
            label="אימייל"
            type="email"
            fullWidth
            {...register("mail")}
            helperText={
              <Typography display="inline" color="error">
                {formState.errors?.mail?.message}
              </Typography>
            }
          />
          <TextField
            margin="dense"
            label="טלפון"
            type="text"
            fullWidth
            {...register("phone")}
            helperText={
              <Typography display="inline" color="error">
                {formState.errors?.phone?.message}
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Controller
                control={control}
                name="shouldBeAllocated"
                render={({ field }) => {
                  return (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      color="primary"
                    />
                  );
                }}
              />
            }
            label="Should be Allocated"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            ביטול
          </Button>
          <Button type="submit" color="primary" variant="contained">
            {isEditing ? "ערוך" : "שמור"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );

}

GuardDialog.propTypes = {
  campId: PropTypes.number.isRequired,
  method: PropTypes.oneOf(["PUT", "POST", "DELETE"]).isRequired,
  open: PropTypes.bool,
  close: PropTypes.close,
};
