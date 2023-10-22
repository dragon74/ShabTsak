import { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../services/apiService";
import { toast } from "react-toastify";
import { Container } from "@mui/material"
import DialogCamp from "../general_comps/dialogCamp";
import CampsList from "./campsList";
import AddCampBtn from "./addCamp/addCampBtn";

const CampsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    doApiCamps()
  }, [])

  const doApiCamps = async () => {
    let url = API_URL + "/camp/all"
    try {
      let resp = await doApiGet(url);
      setCamps(resp.data)
      console.log(resp.data);
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

        <CampsList camps={camps} doApiCamps={doApiCamps} />

        <DialogCamp openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          action="Add"
          doApiCamps={doApiCamps}
        />

      </Container>
    </div>
  )
}

export default CampsPage