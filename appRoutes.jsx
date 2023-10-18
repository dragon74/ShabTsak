import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Layout from './src/layout/layout';
import NotFound from './src/components/general_comps/notFound';
import CampsPage from './src/components/camps/campsPage';
import AddCamp from './src/components/camps/addCamp/addCamp';
import EdiCamp from './src/components/camps/editCamp/editCamp';



export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route index element={<CampsPage />} />
                    <Route path="/addCamp" element={<AddCamp />} />
                    <Route path="/editCamp/:id" element={<EdiCamp />} />
                    {/* <Route path='/favorites' element={<MyFavoritesList />} /> */}
                </Route>
                <Route path='*' element={<NotFound />} />

            </Routes>
            <ToastContainer position="top-left" theme="colored" />

        </Router>
    )
}
