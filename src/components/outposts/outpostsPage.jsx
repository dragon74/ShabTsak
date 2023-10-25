/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { doApiGet } from "../../services/apiService";
import { toast } from "react-toastify";
import { Container } from "@mui/material"
import OutpostList from "./outpostList";
import AddOutpostBtn from "./addOutPost/AddOutpostBtn";
import DialogOutpost from "./dialogOutpost";
import { OUTPOST_URL } from "../../constants/apiConstants";
import { useParams } from "react-router-dom";

const OutpostsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [outposts, setOutposts] = useState([]);
  let params = useParams();

  useEffect(() => {
    getOutpostsByCampId()
  }, [])

  const getOutpostsByCampId = async () => {
    let url = OUTPOST_URL + "/camp/" + params["id"];
    try {
      let resp = await doApiGet(url);
      if (resp.status == 200)
        setOutposts(resp.data)
      else toast.error(resp.message);
    }
    catch (err) {
      console.log(err);
      toast.error("יש בעיה בבקשה נסה מאוחר יותר");
    }
  }

  return (
    <div className="outPosts-page">
      <Container fixed >

        {/* btn-add Outpost */}
        <AddOutpostBtn setOpenDialog={setOpenDialog} />

        <OutpostList outposts={outposts} getOutpostsByCampId={getOutpostsByCampId} />

        <DialogOutpost openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          method="POST"
          getOutpostsByCampId={getOutpostsByCampId}
          campId={params["id"]}
        />

      </Container>
    </div>
  )
}

export default OutpostsPage