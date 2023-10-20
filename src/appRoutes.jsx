import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/layout";
import NotFound from "./components/general_comps/notFound";
import CampsPage from "./components/camps/campsPage";
import AddCamp from "./components/camps/addCamp/addCamp";
import EdiCamp from "./components/camps/editCamp/editCamp";
import { GuardList } from "./components/guards/GuardList";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CampsPage />} />
          <Route path="/addCamp" element={<AddCamp />} />
          <Route path="/guards" element={<GuardList />} />
          <Route path="/editCamp/:id" element={<EdiCamp />} />
          {/* <Route path='/schedule' element={<MyscheduleList />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-left" theme="colored" />
    </Router>
  );
}
