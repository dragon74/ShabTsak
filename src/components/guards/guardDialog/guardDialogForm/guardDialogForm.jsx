import React from 'react'

export const guardDialogForm = () => {
  return (
    <Box component="form" onSubmit={handleSubmit(submit)} sx={{ px: 2, py: 1 }}>
      <DialogTitle>הוסף שומר</DialogTitle>
      <DialogContent>
        <DialogContentText>הזן את פרטי השומר </DialogContentText>
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
                  <Checkbox {...field} checked={field.value} color="primary" />
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
שמור        </Button>
      </DialogActions>
    </Box>
  );
}
