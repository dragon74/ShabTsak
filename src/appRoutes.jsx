import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
//for toast container you need the container will be in app and his css
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout/layout";
import NotFound from "./components/general_comps/notFound";
import CampsPage from "./components/camps/campsPage";
import ShiftSchedule from "./components/ShiftSchedule/ShiftSchedule";
import GuardList from "./components/GuardList/GuardList";
import { useUserStore } from "./services/useUserStore.jsx";
import Login from "./components/Login/Login.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AppRoutes() {
    return (<Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<SecuredRoute><CampsPage /></SecuredRoute>}/>
                    <Route path="/schedule" element={<SecuredRoute><ShiftSchedule /></SecuredRoute>}/>
                    <Route path="/guards" element={<SecuredRoute><GuardList /></SecuredRoute>}/>
                    <Route path="/login" element={<GoogleOAuthProvider clientId={import.meta.env.DEV ? import.meta.env.VITE_CLIENT_ID : 'PROD_CLIENT_ID'}><Login /></GoogleOAuthProvider>} />
                </Route>
                <Route path="*" element={<NotFound />}/>
            </Routes>
            <ToastContainer position="top-left" theme="colored"/>
        </Router>);
}

function SecuredRoute({children}) {
    const user = useUserStore((store) => store.user);
    if (!user) {
        return <Navigate to={'/login'} />
    }

    return children;
}
