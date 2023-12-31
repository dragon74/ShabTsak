import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { defaultValues } from "components/GuardsPage/Guards/Guard/GuardDialogAddOrEdit/defaultValues.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "components/GuardsPage/Guards/Guard/GuardDialogAddOrEdit/schema.js";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { toast } from "react-toastify";
import {useMutation, useQueryClient} from "react-query";
import { addNewGuard, updateGuard } from "@/services/guardService.js";

export default function GuardDialogAddOrEdit({ guardDetails, campId, method, open, close }) {
  const queryClient = useQueryClient();
  const isEditing = method === "PUT";

  const { handleSubmit, register, control, reset, formState } = useForm({
    defaultValues: { ...(isEditing ? guardDetails : defaultValues), campId },
    resolver: yupResolver(schema),
  });

  const { mutate: submit } = useMutation("guardAddOrEdit", (formData) => {
    if (isEditing) {
      // Call updateGuard if it's an edit operation
      return updateGuard(formData);
    } else {
      // Call addNewGuard if it's an add operation
      return addNewGuard(formData);
    }
  }, {
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries(["GuardsPage", campId]);
      if (data.id) {
        await queryClient.setQueryData(["guard", data?.id], data);
      }
      toast.success("שומר נערך בהצלחה!");
      handleCloseDialog();
    },
    onError: () => toast.error("Failed to delete"),
  });

  // const submit = async (formData) => {
  //   try {
  //     console.log("formData", formData);
  //
  //     if (isEditing) {
  //       // Call updateGuard if it's an edit operation
  //       await updateGuard(formData);
  //       toast.success("שומר נערך בהצלחה!");
  //     } else {
  //       // Call addNewGuard if it's an add operation
  //       await addNewGuard(formData);
  //       toast.success("שומר נוסף בהצלחה!");
  //     }
  //
  //     // Invalidate and refetch guard-related queries to update the UI
  //     await queryClient.invalidateQueries(["GuardsPage", campId]);
  //     handleCloseDialog();
  //   } catch (error) {
  //     // Handle the error
  //     toast.error("Failed to process the guard data!");
  //     console.error("Error processing guard data:", error);
  //   }
  // };

  // Function to handle closing the dialog.
  function handleCloseDialog() {
    close();
    reset();
  }

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(submit)} sx={{ px: 2, py: 1 }} noValidate>
        <DialogTitle>{isEditing ? "ערוך שומר" : "הוסף שומר"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{isEditing ? "ערוך את פרטי השומר :" : "הזן את פרטי השומר :"}</DialogContentText>
          <TextField autoFocus margin="dense" label="שם" type="text" fullWidth autoComplete="name" InputProps={{ inputProps: { maxLength: 50 } }} {...register("name")} helperText={<FormError error={formState.errors?.name?.message} />} />
          <TextField margin="dense" label="אימייל" type="email" fullWidth autoComplete="email" {...register("mail")} helperText={<FormError error={formState.errors?.mail?.message} />} />
          <TextField margin="dense" label="טלפון" type="tel" fullWidth autoComplete="tel" {...register("phone")} helperText={<FormError error={formState.errors?.phone?.message} />} />
          <FormControlLabel
            control={
              <Controller
                control={control}
                name="shouldBeAllocated"
                render={({ field }) => {
                  return <Checkbox {...field} checked={field.value} color="primary" />;
                }}
              />
            }
            label="יש להקצות למשמרת"
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

const FormError = ({ error }) => {
  return (
    <Box sx={{ height: 15, display: "block" }} component="span">
      {error && (
        <Typography component="span" color="error" fontSize={13}>
          {error}
        </Typography>
      )}
    </Box>
  );
};
FormError.propTypes = {
  error: PropTypes.string,
};

GuardDialogAddOrEdit.propTypes = {
  campId: PropTypes.number.isRequired,
  method: PropTypes.oneOf(["PUT", "POST", "DELETE"]).isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
