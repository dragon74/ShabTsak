import React from "react";
import { Card, CardContent, Grid, IconButton, ListItemText, Avatar, CardActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getGravatarUrl } from "./utils";

export const GuardItem = ({ guard, onEdit, onDelete }) => (
  <Card key={guard.id} variant="outlined" style={{ marginBottom: "10px" }}>
    <CardContent>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={2}>
          <Avatar src={getGravatarUrl(guard.mail)} alt={guard.name} />
        </Grid>
        <Grid item xs={7}>
          <ListItemText primary={guard.name} secondary={`Email: ${guard.mail} | Phone: ${guard.phone}`} />
        </Grid>
        <Grid item xs={3}>
          <CardActions>
            <IconButton onClick={() => onEdit(guard)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(guard)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
