import { useState } from "react";
import { useQuery } from "react-query";
import { Container, Typography } from "@mui/material";
import CampDialog from "./campDialog";
import AddCampBtn from "./addCampBtn/addCampBtn";
import LoadingComp from "../general_comps/loadingComp";
import CampList from "./campList/campList";
import { getCamps } from "@/services/CampService";


const CampsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    isLoading,
    data: camps,
    isError,
  } = useQuery({
    queryFn: getCamps,
    queryKey: ["camps"],
  });

  if (isLoading) {
    return <LoadingComp />;
  }

  if (isError || !Array.isArray(camps) || camps.length === 0) {
    return <Typography align="center">אין בסיסים עדיין</Typography>;
  }

  return (
    <div className="camps-page">
      <Container fixed>
        {/* btn-add camp */}
        <AddCampBtn setOpenDialog={setOpenDialog} />

        <Typography variant="h3" component="h2" mb={2}>
          רשימת בסיסים
        </Typography>

        <CampList camps={camps} />

        <CampDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          method="POST"
        />
      </Container>
    </div>
  );
};

export default CampsPage;
