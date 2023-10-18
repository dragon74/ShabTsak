import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//for toast container you need the container will be in app and his css
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './src/components/home/homePage';
import Layout from './src/layout/layout';
import NotFound from './src/components/general_comps/notFound';



export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />} >

                    <Route index element={<HomePage />} />
                    {/* <Route path='/favorites' element={<MyFavoritesList />} /> */}
                </Route>
                <Route path='*' element={<NotFound />} />

            </Routes>
            <ToastContainer position="top-left" theme="colored" />

        </Router>
    )
}
