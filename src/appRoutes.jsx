import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/layout";
import NotFound from "./components/general_comps/notFound";
import CampsPage from "./components/camps/campsPage";
import ShiftSchedule from "./components/ShiftSchedule/ShiftSchedule";
import GuardList from "./components/GuardList/GuardList";
import GuardProfile from "./components/GuardList/GuardProfile";
import ROUTES from "./constants/routeConstants";
import OutpostsPage from "./components/outposts/outpostsPage";
import PrivacyPage from "./components/privacy/privacyPage";
import ServiceTermsPage from "./components/service_terms/serviceTermsPage";
import ShiftsPage from "./components/shifts/shiftsPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<CampsPage />} />
          <Route path={ROUTES.SCHEDULE} element={<ShiftSchedule />} />
          <Route path={`${ROUTES.SHIFTS}${ROUTES.OUTPOST}/:id/:name`} element={<ShiftsPage />} />
          <Route path={`${ROUTES.OUTPOSTS}${ROUTES.CAMP}/:id/:name`} element={<OutpostsPage />} />
          <Route path={`${ROUTES.GUARDS}${ROUTES.CAMP}/:id`} element={<GuardList />} />
          <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
          <Route path={ROUTES.SERVICETERMS} element={<ServiceTermsPage />} />
          <Route path={ROUTES.GUARDS + "/:id"} element={<GuardProfile />} />
          <Route path={ROUTES.GUARDS} element={<GuardList />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-left" theme="colored" />
    </Router>
  );
}
