import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "@mui/material"
import { OUTPOST_URL } from "../../constants/apiConstants";
import { doApiGet } from "../../services/apiService";
import OutpostList from "./outpostList/outpostList";
import AddOutpostBtn from "./addOutpostBtn/AddOutpostBtn";
import OutpostDialog from "./outpostDialog";

const OutpostsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [outposts, setOutposts] = useState([]);
  const params = useParams();

  useEffect(() => {
    doApiOutposts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const doApiOutposts = async () => {
    let url = OUTPOST_URL + "/camp/" + params["id"];
    try {
      let resp = await doApiGet(url);
      if (resp.status === 200)
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

        <OutpostList outposts={outposts} doApiOutposts={doApiOutposts}  />

        <OutpostDialog openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          method="POST"
          doApiOutposts={doApiOutposts}
        />

      </Container>
    </div>
  )
}

export default OutpostsPage