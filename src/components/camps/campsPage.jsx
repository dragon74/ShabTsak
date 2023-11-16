import { useState } from "react";
import { useQuery } from "react-query";
import { Container, Typography } from "@mui/material";
import CampDialog from "./campDialog";
import CampList from "./campList/campList";
import AddCampBtn from "./addCampBtn/addCampBtn";
import LoadingComp from "../general_comps/loadingComp";
import { getCamps } from "@/services/CampService";

const CampsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  // const { isLoading, data: camps } = useQuery('camps', getCamps)

  const { isLoading, data: camps } = useQuery({
    queryFn: getCamps,
    queryKey: ["camps"],
  });

  return (
    <div className="camps-page">
      <Container fixed>
        {/* btn-add camp */}
        <AddCampBtn setOpenDialog={setOpenDialog} />

        <Typography variant="h3" component="h2" mb={2}>
          רשימת בסיסים
        </Typography>

        {isLoading ? (
          <LoadingComp />
        ) : camps?.length === 0 ? (
          <Typography variant="h5" component="h2" my={2}>
            אין בסיסים עדיין
          </Typography>
        ) : (
          <CampList camps={camps} />
        )}

        <CampDialog openDialog={openDialog} setOpenDialog={setOpenDialog} method="POST" />
      </Container>
    </div>
  );
};

export default CampsPage;
