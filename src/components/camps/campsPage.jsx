import { useState } from "react";
import { Box, Button, Container, CssBaseline } from "@mui/material"
import DialogComp from "../general_comps/dialogComp";
import CampsList from "./campsList";

const CampsPage = () => {
 
  const [openDialog, setOpenDialog] = useState(false);


  return (
    <div className="camps-page">
      <CssBaseline />
      <Container fixed>

        <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px' }}>
          <Button variant="contained"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            הוסף קעמפ חדש
          </Button>
        </Box>

        <CampsList />

        <DialogComp openDialog={openDialog} setOpenDialog={setOpenDialog} subject={"camp"} action="Add" />


      </Container>
    </div>
  )
}

export default CampsPage