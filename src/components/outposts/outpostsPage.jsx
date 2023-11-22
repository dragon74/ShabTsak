import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Container, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import OutpostList from "./outpostList/outpostList";
import OutpostDialog from "./outpostDialog";
import BackLink from "../general_comps/backLink";
import LoadingComp from "../general_comps/loadingComp";
import AddOutpostBtn from "./addOutpostBtn/addOutpostBtn.jsx";
import { getOutpostsByCampId } from "@/services/OutpostService";

const OutpostsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const params = useParams();
  const campId = params["id"];

  const { isLoading, data: outposts } = useQuery({
    queryFn: () => getOutpostsByCampId(campId),
    queryKey: ["outposts", campId],
  });

  return (
    <div className="outPosts-page">
      <Container fixed>
        {/* btn-add Outpost */}
        <AddOutpostBtn setOpenDialog={setOpenDialog} />

        <Typography variant="h3" component="h2" mb={2}>
          רשימת עמדות {params["name"]}
        </Typography>

        {isLoading ? (
          <LoadingComp />
        ) : outposts.length === 0 || !outposts ? (
          <Typography variant="h5" component="h2" my={2}>
            אין עמדות עדיין
          </Typography>
        ) : (
          <OutpostList outposts={outposts} />
        )}

        <OutpostDialog openDialog={openDialog} setOpenDialog={setOpenDialog} method="POST" />

        <BackLink place="end" icon={<ArrowBackIosIcon />}>
          חזרה לרשימת הבסיסים
        </BackLink>
      </Container>
    </div>
  );
};

export default OutpostsPage;
