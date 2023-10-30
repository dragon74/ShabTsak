import React from "react";
import { Card, CardContent, Grid, IconButton, ListItemText, Avatar, CardActions , Chip, CardHeader } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getGravatarUrl } from "./utils";


const StatusChip = ({ shouldBeAllocated }) => (shouldBeAllocated ? <Chip label="משתתף" color="primary" /> : <Chip label="לא משתתף" color="secondary" />);

export const GuardItem = ({ guard, onEdit, onDelete }) => (
  <Card key={guard.id} variant="outlined" style={{ marginBottom: "15px", padding: "10px", boxShadow: "0 3px 5px rgba(0,0,0,0.2)" }}>
    <CardContent>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={2}>
          <Avatar src={getGravatarUrl(guard.mail)} alt={guard.name} />
        </Grid>
        <Grid item xs={5}>
          <ListItemText primary={guard.name} secondary={`Email: ${guard.mail} | Phone: ${guard.phone}`} />
        </Grid>
        <Grid item xs={2}>
          <StatusChip shouldBeAllocated={guard.shouldBeAllocated} />
        </Grid>
        <Grid item xs={3} style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => onEdit(guard)} size="large">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(guard)} size="large" style={{ marginLeft: "10px" }}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
