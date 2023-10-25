import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Avatar, Grid } from "@mui/material";
import { getGravatarUrl } from "./utils"; // ensure this import path is correct
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const GuardDetail = () => {
  const { id } = useParams();
  const [guard, setGuard] = useState(null);

  useEffect(() => {
    axios
      .get(`https://shabtsak.onrender.com/guard/${id}`)
      .then((response) => {
        setGuard(response.data);
      })
      .catch((error) => {
        console.error("Error fetching guard details:", error);
      });
  }, [id]);

  if (!guard) return "Loading...";

  return (
    <Card style={{ minWidth: 275, maxWidth: 500, margin: "auto", marginTop: "20px", padding: "16px" }}>
      <CardContent>
        <Avatar src={getGravatarUrl(guard.mail)} alt={guard.name} style={{ width: "120px", height: "120px", margin: "auto" }}>
          {!getGravatarUrl(guard.mail) && <MilitaryTechIcon fontSize="large" />}
        </Avatar>
        <Typography variant="h5" component="h2" style={{ marginBottom: "32px", textAlign: "center" }}>
          {guard.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" component="p">
              Email: {guard.mail}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" component="p">
              Phone: {guard.phone}
            </Typography>
          </Grid>
          {/* And so on for other details */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GuardDetail;
