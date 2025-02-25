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
import Manage from "../Pages/Manage";
import Update from "../Pages/Update";
import Recharts from "../Pages/Recharts";
import Registered from "../Pages/Registered";
import Payment from "../Pages/payment/Payment";
import Mregister from "../Pages/Manaereg/Mregister";
import PaymentHistory from "../Pages/PaymentHistory";
import Privateroute from "./Privateroute";
import Errorpage from "../Pages/Errorpage";



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
        element: <Privateroute>
            <Dashboard></Dashboard>
        </Privateroute>,
        children: [
            {
                path: 'addcamp',
                element: <AddCamp></AddCamp>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'manage',
                element: <Manage></Manage>
            },
            {
                path: 'recharts',
                element: <Recharts></Recharts>
            },
            {
                path: 'registered',
                element: <Registered></Registered>
            },
            {
                path: 'pay/:id',
                element: <Payment></Payment>
            },
            {
                path: 'update/:id',
                element: <Update></Update>
            },
            {
                path: 'mregister',
                element: <Mregister></Mregister>
            },
            {
                path: 'payhistory',
                element: <PaymentHistory></PaymentHistory>
            }
        ]
    },
    {
        path: '*',
        element: <Errorpage />
    }
])

export default Router;