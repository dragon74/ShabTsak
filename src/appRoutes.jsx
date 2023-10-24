import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/layout";
import NotFound from "./components/general_comps/notFound";
import CampsPage from "./components/camps/campsPage";
import ShiftSchedule from "./components/ShiftSchedule/ShiftSchedule";
import GuardList from "./components/GuardList/GuardList";
import Login from "./components/Login/Login.jsx";
import LimitsPage from "./components/limits/limitsPage";
import OutpostsPage from "./components/outposts/outPostsPage";
import ROUTES from "./constants/routeConstants";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Navigate } from 'react-router-dom';
import { useUserStore } from "./services/useUserStore.jsx";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
            <Route index element={<SecuredRoute><CampsPage /></SecuredRoute>} />
            <Route path={ROUTES.SCHEDULE} element={<SecuredRoute><ShiftSchedule /></SecuredRoute>} />
            <Route path={ROUTES.GUARDS} element={<SecuredRoute><GuardList /></SecuredRoute>} />
            <Route path={ROUTES.OUTPOSTS+"/:id"} element={<SecuredRoute><OutpostsPage /></SecuredRoute>} />
            <Route path={ROUTES.LIMITS} element={<SecuredRoute><LimitsPage /></SecuredRoute>} />
            <Route path={ROUTES.LOGIN} element={<GoogleOAuthProvider clientId={import.meta.env.DEV ? import.meta.env.VITE_CLIENT_ID : 'PROD_CLIENT_ID'}><Login /></GoogleOAuthProvider>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-left" theme="colored" />
    </Router>
  );
}

function SecuredRoute({children}) {
    const user = useUserStore((store) => store.user);
    if (!user) {
        return <Navigate to={'/login'} />
    }

    return children;
}