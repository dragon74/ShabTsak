import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container } from "@mui/material"
import DialogCamp from "./dialogCamp";
import CampList from "./campList/campList";
import AddCampBtn from "./addCampBtn/addCampBtn";
import { doApiGet } from "../../services/apiService";
import { CAMP_URL } from "../../constants/apiConstants";

const CampsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    doApiCamps()
  }, [])

  const doApiCamps = async () => {
    let url = CAMP_URL + "/all"
    try {
      let resp = await doApiGet(url);
      setCamps(resp.data)
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

        <CampList camps={camps} doApiCamps={doApiCamps} />

        <DialogCamp openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          method="POST"
          doApiCamps={doApiCamps}
        />

      </Container>
    </div>
  )
}

export default CampsPage