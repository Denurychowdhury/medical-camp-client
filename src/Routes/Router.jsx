import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home";
import JoinUs from "../Pages/JoinUs";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import AddCamp from "../Components/Addcamp";
import Profile from "../Pages/Profile";


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
                path: '/login',
                element: <JoinUs></JoinUs>
            },
            {
                path: '/register',
                element: <Register></Register>
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