import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Container, Typography } from "@mui/material"
import CampDialog from "./campDialog";
import CampList from "./campList/campList";
import AddCampBtn from "./addCampBtn/addCampBtn";
import { doApiGet } from "../../services/apiService";
import { CAMP_URL } from "../../constants/apiConstants";
import LoadingComp from "../general_comps/loadingComp";

const CampsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { isLoading, data: camps } = useQuery('camps', doApiCamps)

  async function doApiCamps() {
    let url = CAMP_URL + "/all"
    try {
      let resp = await doApiGet(url);
      return resp.data
    }
    catch (err) {
      console.log(err);
      toast.error("יש בעיה בבקשה נסה מאוחר יותר");
    }
  }


  return (
    <div className="camps-page">
      <Container fixed>

        {/* btn-add camp */}
        <AddCampBtn setOpenDialog={setOpenDialog} />

        <Typography variant="h4" component="h2" mb={2}>
          רשימת בסיסים
        </Typography>

        {isLoading ?
          <LoadingComp />
          :
          (camps.length == 0 ?
            <Typography variant="h4" component="h2" my={2}>אין בסיסים עדיין</Typography>
            : <CampList camps={camps} />)}


        <CampDialog openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          method="POST"
        />

      </Container>
    </div>
  )
}

export default CampsPage