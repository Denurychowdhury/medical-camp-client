import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home";
import JoinUs from "../Pages/JoinUs";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import AddCamp from "../Components/Addcamp";
import Profile from "../Pages/Profile";
import Available from "../Pages/Available";
import Campdetails from "../Pages/Campdetails";


const Router = createBrowserRouter([
    {
        path: '/',
        element: <Mainlayout></Mainlayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/available',
                element: <Available></Available>
            },
            {
                path: '/login',
                element: <JoinUs></JoinUs>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/details/:id',
                element: <Campdetails></Campdetails>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'addcamp',
                element: <AddCamp></AddCamp>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            }
        ]
    }
])

export default Router;