import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/layout";
import NotFound from "./components/general_comps/notFound";
import CampsPage from "./components/camps/campsPage";
import ShiftSchedule from "./components/ShiftSchedule/ShiftSchedule";
import GuardList from "./components/GuardList/GuardList";
import OutpostsPage from "./components/outposts/outPostsPage";
import ROUTES from "./constants/routeConstants";
import LimitsPage from "./components/limits/limitsPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<CampsPage />} />
          <Route path={ROUTES.SCHEDULE} element={<ShiftSchedule />} />
          <Route path={ROUTES.GUARDS} element={<GuardList />} />
          <Route path={ROUTES.OUTPOSTS+"/:id"} element={<OutpostsPage />} />
          <Route path={ROUTES.LIMITS} element={<LimitsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-left" theme="colored" />
    </Router>
  );
}
