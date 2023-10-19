import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layout/layout';
import NotFound from './components/general_comps/notFound';
import CampsPage from './components/camps/campsPage';




export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route index element={<CampsPage />} />
                    
                    {/* <Route path='/schedule' element={<MyscheduleList />} /> */}
                </Route>
                <Route path='*' element={<NotFound />} />

            </Routes>
            <ToastContainer position="top-left" theme="colored" />

        </Router>
    )
}
