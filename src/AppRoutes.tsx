import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ROUTES from "@/constants/routeConstants";

const Layout = React.lazy(() => import("components/Layout/Layout"));
const NotFound = React.lazy(() => import("components/general_comps/NotFound"));
const CampsPage = React.lazy(() => import("components/CampsPage/CampsPage"));
const ShiftSchedule = React.lazy(() => import("components/ShiftSchedule/ShiftSchedule") as any);
const LoginPage = React.lazy(() => import("components/LoginPage/LoginPage"));
const GuardProfile = React.lazy(() => import("components/GuardProfile/GuardProfile") as any);
const OutpostsPage = React.lazy(() => import("components/outposts/outpostsPage") as any);
const PrivacyPage = React.lazy(() => import("components/PrivacyPage/PrivacyPage") as any);
const TermsPage = React.lazy(() => import("components/terms/termsPage") as any);
const ShiftsPage = React.lazy(() => import("components/shifts/shiftsPage") as any);
const GuardsPage = React.lazy(() => import("components/GuardsPage/GuardsPage") as any);
const LandingPage = React.lazy(() => import("components/LandingPage/LandingPage"));
import { useAuthContext } from "@/context/AuthContext";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.HOME} element={<Suspense><Layout/></Suspense>}>
                    <Route path={ROUTES.HOME} element={<PrivateRoute/>}>
                        <Route index element={<CampsPage/>}/>
                        <Route path={ROUTES.SCHEDULE} element={<ShiftSchedule/>}/>
                        <Route path={`${ROUTES.OUTPOSTS}${ROUTES.CAMP}/:id/:name?`} element={<OutpostsPage/>}/>
                        <Route path={`${ROUTES.SHIFTS}${ROUTES.OUTPOST}/:id/:name?`} element={<ShiftsPage/>}/>
                        <Route path={ROUTES.GUARD_PROFILE} element={<GuardProfile/>}/>
                        <Route path={ROUTES.GUARDS} element={<GuardsPage/>}/>
                    </Route>
                    <Route element={<Suspense><Outlet /></Suspense>}>
                        <Route path={ROUTES.PRIVACY} element={<PrivacyPage/>}/>
                        <Route path={ROUTES.TERMS} element={<TermsPage/>}/>
                        <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                        <Route path={ROUTES.LANDING} element={<LandingPage/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Route>
            </Routes>
            <ToastContainer position="bottom-right" theme="colored" rtl/>
        </Router>
    );
}

function PrivateRoute() {
    const { user } = useAuthContext();

    if (user === undefined) {
        return null;
    }

    if (user === null) {
        return <Navigate to={ROUTES.LANDING}/>
    }

    return <Suspense><Outlet/></Suspense>;
}