import React, {useState} from "react";
import { Typography, Container } from "@mui/material";
import SelectCamp from "components/general_comps/selectCamp.jsx";
import GuardDialog from "components/guards/guardDialog/guardDialog.jsx";
import {useParams} from "react-router-dom";

export default function GuardsPage() {
    const params = useParams();
    const [dialogOpen, setDialogOpen] = React.useState(true); // TODO: Fetch outside or inside the list? Create / Edit (Guard or Initial) (method: POST / PUT) (guard details?)
    const [selectedCampId, setSelectedCampId] = useState(params["id"] || "");
    // const [selectedGuardId, setSelectedGuardId] = useState(null); TODO: Is this the best way ?

    return (
        <Container sx={{ display: "grid", gap: 3, pt: 4 }}>
            <Typography variant="h3" component="h2" gutterBottom>
                ניהול סד"כ
            </Typography>
            <SelectCamp
                selectedCampId={selectedCampId}
                setSelectedCampId={setSelectedCampId}
                title="בחר מחנה: "
            />
            {/* TODO: <GuardsList dialogOpen={} />*/}
            <GuardDialog open={dialogOpen} guardId={0} method={"POST"} close={() => setDialogOpen(false)} />
        </Container>
    )
}