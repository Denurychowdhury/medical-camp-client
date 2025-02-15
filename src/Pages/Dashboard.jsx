import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { authcontext } from '../Authprovider/Authprovider';


const Dashboard = () => {
    const { user } = useContext(authcontext);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/users/${user.email}`)
                .then(response => {
                    setUserRole(response.data.role);
                })
                .catch(error => {
                    console.error("Failed to fetch user role:", error);
                });
        }
    }, [user]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}

            {
                userRole == 'admin' ? <div className="w-64 bg-blue-800 text-white p-4">
                    <h1 className="text-2xl font-bold mb-6">Organizer Dashboard</h1>
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <NavLink
                                    to="/dashboard/profile"
                                    className={({ isActive }) => isActive ? "text-blue-300 font-bold" : "hover:text-blue-300"}
                                >
                                    Organizer Profile
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink
                                    to="/dashboard/addcamp"
                                    className={({ isActive }) => isActive ? "text-blue-300 font-bold" : "hover:text-blue-300"}
                                >
                                    Add A Camp
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink
                                    to="/dashboard/manage"
                                    className={({ isActive }) => isActive ? "text-blue-300 font-bold" : "hover:text-blue-300"}
                                >
                                    Manage Camps
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink
                                    to="/dashboard/mregister"
                                    className={({ isActive }) => isActive ? "text-blue-300 font-bold" : "hover:text-blue-300"}
                                >
                                    Manage Registered Camps
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div> :
                    <div className="w-64 bg-blue-800 text-white p-4">
                        <h1 className="text-2xl font-bold mb-6">Participant Dashboard</h1>
                        <nav>
                            <ul>
                                <li className="mb-4">
                                    <NavLink
                                        to="/dashboard/recharts"
                                        className={({ isActive }) => isActive ? "text-blue-300 font-bold" : "hover:text-blue-300"}
                                    >
                                        Analytics
                                    </NavLink>
                                </li>
                                <li className="mb-4">
                                    <NavLink
                                        to="/dashboard/profile"
                                        className={({ isActive }) => isActive ? "text-blue-300 font-bold" : "hover:text-blue-300"}
                                    >
                                        Participant Profile
                                    </NavLink>
                                </li>
                                <li className="mb-4">
                                    <NavLink
                                        to="/dashboard/registered"
                                        className={({ isActive }) => isActive ? "text-blue-300 font-bold" : "hover:text-blue-300"}
                                    >
                                        Registered Camps
                                    </NavLink>
                                </li>
                                <li className="mb-4">
                                    <NavLink
                                        to="/dashboard/payhistory"
                                        className={({ isActive }) => isActive ? "text-blue-300 font-bold" : "hover:text-blue-300"}
                                    >
                                        Payment History
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
            }

            {/* Main Content */}
            <div className="w-full p-8">
                {/* Content will be rendered here based on the route */}
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;