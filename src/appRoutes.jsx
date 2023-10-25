import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/layout";
import NotFound from "./components/general_comps/notFound";
import CampsPage from "./components/camps/campsPage";
import ShiftSchedule from "./components/ShiftSchedule/ShiftSchedule";
import GuardList from "./components/GuardList/GuardList";
import ROUTES from "./constants/routeConstants";
import LimitsPage from "./components/limits/limitsPage";
import OutpostsPage from "./components/outposts/outpostsPage";
import PrivacyPage from "./components/privacy/privacyPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<CampsPage />} />
          <Route path={ROUTES.SCHEDULE} element={<ShiftSchedule />} />
          <Route path={ROUTES.GUARDS + "/camp/:id"} element={<GuardList />} />
          <Route path={ROUTES.GUARDS} element={<GuardList />} />
          <Route path={ROUTES.OUTPOSTS + "/camp/:id"} element={<OutpostsPage />} />
          <Route path={ROUTES.LIMITS} element={<LimitsPage />} />
          <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-left" theme="colored" />
    </Router>
  );
}
