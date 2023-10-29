/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Container, Typography } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { OUTPOST_URL } from "../../constants/apiConstants";
import { doApiGet } from "../../services/apiService";
import OutpostList from "./outpostList/outpostList";
import AddOutpostBtn from "./addOutpostBtn/addOutpostBtn";
import OutpostDialog from "./outpostDialog";
import BackLink from "../general_comps/backLink";
import LoadingComp from "../general_comps/loadingComp";

const OutpostsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const params = useParams();

  const { isLoading, data: outposts } = useQuery(['outposts', params["id"]], doApiOutposts);

  // console.log({ isLoading, isError, error, outposts });

  async function doApiOutposts() {
    let url = OUTPOST_URL + "/camp/" + params["id"];
    try {
      let resp = await doApiGet(url);
      if (resp.status === 200) {
        // console.log(resp.data);
        return resp.data;
      }
      else {
        toast.error(resp.message);
      }
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

        <Typography variant="h4" component="h2" mb={2}>
          רשימת עמדות {params["name"]}
        </Typography>

        {isLoading ?
          <LoadingComp />
          : outposts.length == 0 ?
            <Typography variant="h6" component="h2" my={2}>אין בסיסים עדיין</Typography>
            : <OutpostList outposts={outposts} />}


        <OutpostDialog openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          method="POST"
        />

        <BackLink place="end" icon={<ArrowBackIosIcon />}>חזרה לרשימת הבסיסים</BackLink>
      </Container>
    </div>
  )
}

export default OutpostsPage