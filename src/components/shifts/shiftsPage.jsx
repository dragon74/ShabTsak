// import { useEffect, useState} from "react";
// import { useParams } from "react-router-dom";
import { Container } from "@mui/material"
// import { toast } from "react-toastify";
// import { SHIFT_URL } from "../../constants/apiConstants";
// import { doApiGet } from "../../services/apiService";
// import AddShiftBtn from "./addShift/AddShiftBtn";
// import DialogOutpost from "./dialogOutpost";

const ShiftsPage = () => {
  // const [openDialog, setOpenDialog] = useState(false);
  // const [outposts, setOutposts] = useState([]);
  // const params = useParams();

  // useEffect(() => {
  //   doApiShifts()
  // }, [])

  // const doApiShifts = async () => {
  //   let url = SHIFT_URL +"/"+ params["id"];
  //   // console.log(url);
  //   try {
  //     let resp = await doApiGet(url);
  //     if (resp.status === 200)
  //       setOutposts(resp.data)
  //     else toast.error(resp.message);
  //   }
  //   catch (err) {
  //     console.log(err);
  //     toast.error("יש בעיה בבקשה נסה מאוחר יותר");
  //   }
  // }

  return (
    <div className="shifts-page">
      <Container fixed >
      shiftList
        {/* btn-add Shift */}
        {/* <AddShiftBtn setOpenDialog={setOpenDialog} /> */}

        {/* <OutpostList outposts={outposts} doApiOutposts={doApiShifts}  /> */}

        {/* 
        <DialogOutpost openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          method="POST"
          doApiOutposts={doApiShifts}
        />  */}

      </Container>
    </div>
  )
}

export default ShiftsPage