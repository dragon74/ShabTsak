import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ROUTES from "@/constants/routeConstants";
import Layout from "@/layout/Layout.jsx";
const NotFound = React.lazy(() => import("components/general_comps/NotFound"));
const CampsPage = React.lazy(() => import("components/CampsPage/CampsPage"));
const ShiftSchedule = React.lazy(() => import("components/ShiftSchedule/ShiftSchedule") as any);
const LoginPage = React.lazy(() => import("components/LoginPage/LoginPage"));
const GuardProfile = React.lazy(() => import("components/GuardList/GuardProfile") as any);
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
                <Route path={ROUTES.HOME} element={<Layout/>}>
                    <Route index element={<PrivateRoute><Suspense><CampsPage/></Suspense></PrivateRoute>}/>
                    <Route path={ROUTES.SCHEDULE} element={<PrivateRoute><Suspense><ShiftSchedule/></Suspense></PrivateRoute>}/>
                    <Route path={`${ROUTES.OUTPOSTS}${ROUTES.CAMP}/:id/:name`}
                           element={<PrivateRoute><Suspense><OutpostsPage/></Suspense></PrivateRoute>}/>
                    <Route path={`${ROUTES.SHIFTS}${ROUTES.OUTPOST}/:id/:name`}
                           element={<PrivateRoute><Suspense><ShiftsPage/></Suspense></PrivateRoute>}/>
                    <Route path={ROUTES.GUARD_PROFILE} element={<PrivateRoute><Suspense><GuardProfile/></Suspense></PrivateRoute>}/>
                    <Route path={ROUTES.GUARDS} element={<PrivateRoute><Suspense><GuardsPage/></Suspense></PrivateRoute>}/>
                    <Route path={ROUTES.PRIVACY} element={<Suspense><PrivacyPage/></Suspense>}/>
                    <Route path={ROUTES.TERMS} element={<Suspense><TermsPage/></Suspense>}/>
                    <Route path="*" element={<Suspense><NotFound/></Suspense>}/>
                    <Route path={ROUTES.LOGIN} element={<Suspense><LoginPage/></Suspense>}/>
                    <Route path={ROUTES.LANDING} element={<Suspense><LandingPage/></Suspense>}/>
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