import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Container, Typography } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { SHIFT_URL } from "../../constants/apiConstants";
import { doApiGet } from "../../services/apiService";
import AddShiftBtn from "./addShiftBtn/addShiftBtn";
import DialogShift from "./shiftDialog";
import ShiftList from "./shiftList/shiftList";
import BackLink from "../general_comps/backLink";
import LoadingComp from "../general_comps/loadingComp";

const ShiftsPage = () => {
  const params = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const { isLoading, data: shifts } = useQuery(['shifts', params["id"]], doApiShifts);

  // console.log(params);
  // console.log({ isLoading, isError, error, shifts });

  async function doApiShifts() {
    let url = SHIFT_URL + "/outpost/" + params["id"];
    console.log(url);
    try {
      let resp = await doApiGet(url);
      if (resp.status === 200) {
        console.log(resp.data);
        return resp.data;
      }
      else toast.error(resp.message);
    }
    catch (err) {
      console.log(err);
      toast.error("יש בעיה בבקשה נסה מאוחר יותר");
    }
  }

  return (
    <div className="shifts-page">
      <Container fixed >

        {/* btn-add Shift */}
        <AddShiftBtn setOpenDialog={setOpenDialog} />

        <Typography variant="h4" component="h2" mb={2}>
          רשימת משמרות {params["name"]}
        </Typography>

        {isLoading ?
          <LoadingComp />
          : shifts.length == 0 ?
            <Typography variant="h4" component="h2" my={2}>אין משמרות עדיין</Typography>
            : <ShiftList shifts={shifts} />}


        <DialogShift openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          method="POST"
          doApiShifts={doApiShifts}
        />
        <BackLink place="end" icon={<ArrowBackIosIcon />}>חזרה לרשימת העמדות</BackLink>

      </Container>
    </div>
  )
}

export default ShiftsPage