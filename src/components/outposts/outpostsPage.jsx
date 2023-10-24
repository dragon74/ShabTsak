/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../services/apiService";
import { toast } from "react-toastify";
import { Container } from "@mui/material"
import OutpostList from "./outpostList";
import AddOutpostBtn from "./addOutPost/AddOutpostBtn";
import DialogOutpost from "./dialogOutpost";

const OutpostsPage = ({ campId}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [outposts, setOutposts] = useState([]);

  useEffect(() => {
    getOutpostsByCampId()
  }, [])

  const getOutpostsByCampId = async () => {
    let url = API_URL + "/outpost/camp/" + campId;
    try {
      let resp = await doApiGet(url);
      setOutposts(resp.data)
      console.log(resp.data);
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

        <OutpostList outposts={outposts} getOutpostsByCampId={getOutpostsByCampId} campId={campId}/>

        <DialogOutpost openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          action="Add"
          getOutpostsByCampId={getOutpostsByCampId}
          campId={campId}
        />

      </Container>
    </div>
  )
}

export default OutpostsPage