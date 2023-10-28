import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material"
import { toast } from "react-toastify";
import { SHIFT_URL } from "../../constants/apiConstants";
import { doApiGet } from "../../services/apiService";
import AddShiftBtn from "./addShiftBtn/addShiftBtn";
import DialogShift from "./shiftDialog";
import ShiftList from "./shiftList/shiftList";
import BackLink from "../general_comps/backLink";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ShiftsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [shifts, setShifts] = useState([]);
  const params = useParams();

  useEffect(() => {
    doApiShifts()
  }, [])

  const doApiShifts = async () => {
    let url = SHIFT_URL +"/"+ params["id"];
    // console.log(url);
    try {
      let resp = await doApiGet(url);
      if (resp.status === 200)
      setShifts(resp.data)
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

        <ShiftList shifts={shifts} doApiShifts={doApiShifts}  />

        
        <DialogShift openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          method="POST"
          doApiShifts={doApiShifts}
        /> 
        <BackLink place="end" icon={<ArrowBackIosIcon/>}>חזרה לעמוד עמדות</BackLink>

      </Container>
    </div>
  )
}

export default ShiftsPage