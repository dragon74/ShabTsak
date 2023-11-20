import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/layout/layout";
import NotFound from "components/general_comps/notFound";
import CampsPage from "components/camps/campsPage";
import ShiftSchedule from "components/ShiftSchedule/ShiftSchedule";
import Login from "components/Login/Login.jsx";
import GuardProfile from "components/GuardList/GuardProfile";
import ROUTES from "@/constants/routeConstants";
import OutpostsPage from "components/outposts/outpostsPage";
import PrivacyPage from "components/privacy/privacyPage";
import ServiceTermsPage from "components/service_terms/serviceTermsPage";
import ShiftsPage from "components/shifts/shiftsPage";
import LimitsPage from "components/limits/limitsPage";
import { useAuth } from "@/hooks/useAuth.jsx";
import PropTypes from "prop-types";
import GuardsPage from "components/guards/guardsPage.jsx";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<PrivateRoute><CampsPage /></PrivateRoute>} />
          <Route path={ROUTES.SCHEDULE} element={<PrivateRoute><ShiftSchedule /></PrivateRoute>} />
          <Route path={`${ROUTES.OUTPOSTS}${ROUTES.CAMP}/:id/:name`} element={<PrivateRoute><OutpostsPage /></PrivateRoute>} />
          <Route path={`${ROUTES.SHIFTS}${ROUTES.OUTPOST}/:id/:name`} element={<PrivateRoute><ShiftsPage /></PrivateRoute>} />
          <Route path={ROUTES.LIMITS} element={<PrivateRoute><LimitsPage /></PrivateRoute>} />
          <Route path={ROUTES.GUARDS + "/:id"} element={<PrivateRoute><GuardProfile /></PrivateRoute>} />
          <Route path={ROUTES.GUARDS} element={<PrivateRoute><GuardsPage /></PrivateRoute>} />
          <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
          <Route path={ROUTES.SERVICETERMS} element={<ServiceTermsPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" theme="colored" rtl />
    </Router>
  );
}



function PrivateRoute({ children }) {
  const { init, user } = useAuth();

  React.useEffect(() => {
    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (user === undefined) {
    return null;
  }

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return children;
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
}

