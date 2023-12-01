import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/layout/Layout.jsx";
import NotFound from "components/general_comps/NotFound.jsx";
import CampsPage from "components/camps/campsPage";
import ShiftSchedule from "components/ShiftSchedule/ShiftSchedule";
import LoginPage from "components/LoginPage/LoginPage";
import GuardProfile from "components/GuardList/GuardProfile";
import ROUTES from "@/constants/routeConstants";
import OutpostsPage from "components/outposts/outpostsPage";
import PrivacyPage from "components/PrivacyPage/PrivacyPage.jsx";
import TermsPage from "components/terms/termsPage";
import ShiftsPage from "components/shifts/shiftsPage";
import GuardsPage from "components/GuardsPage/GuardsPage";
import LandingPage from "components/LandingPage/LandingPage";
import { useAuthContext } from "@/context/AuthContext";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.HOME} element={<Layout/>}>
                    <Route index element={<PrivateRoute><CampsPage/></PrivateRoute>}/>
                    <Route path={ROUTES.SCHEDULE} element={<PrivateRoute><ShiftSchedule/></PrivateRoute>}/>
                    <Route path={`${ROUTES.OUTPOSTS}${ROUTES.CAMP}/:id/:name`}
                           element={<PrivateRoute><OutpostsPage/></PrivateRoute>}/>
                    <Route path={`${ROUTES.SHIFTS}${ROUTES.OUTPOST}/:id/:name`}
                           element={<PrivateRoute><ShiftsPage/></PrivateRoute>}/>
                    <Route path={ROUTES.GUARD_PROFILE} element={<PrivateRoute><GuardProfile/></PrivateRoute>}/>
                    <Route path={ROUTES.GUARDS} element={<PrivateRoute><GuardsPage/></PrivateRoute>}/>
                    <Route path={ROUTES.PRIVACY} element={<PrivacyPage/>}/>
                    <Route path={ROUTES.TERMS} element={<TermsPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                    <Route path={ROUTES.LANDING} element={<LandingPage/>}/>
                </Route>
            </Routes>
            <ToastContainer position="bottom-right" theme="colored" rtl/>
        </Router>
    );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuthContext();

    if (user === undefined) {
        return null;
    }

    if (user === null) {
        return <Navigate to={ROUTES.LOGIN}/>
    }

    return children;
}