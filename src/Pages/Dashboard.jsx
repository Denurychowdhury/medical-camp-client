import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaChartLine, FaHistory, FaHome, FaList, FaPlus, FaRegRegistered, FaUser } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { authcontext } from '../Authprovider/Authprovider';

const Dashboard = () => {
    const { user } = useContext(authcontext);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axios.get(`https://medical-camp-server-nine.vercel.app/users/${user.email}`)
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
            <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-6 shadow-lg">
                {/* Back to Home Button */}
                <Link to="/" className="flex items-center space-x-2 mb-8 hover:text-blue-300 transition-colors">
                    <FaHome className="w-5 h-5" />
                    <span>Back to Home</span>
                </Link>

                {/* Dashboard Title */}
                <h1 className="text-2xl font-bold mb-8">
                    {userRole === 'admin' ? 'Organizer Dashboard' : 'Participant Dashboard'}
                </h1>

                {/* Navigation Links */}
                <nav>
                    <ul>
                        {userRole === 'admin' ? (
                            <>
                                <li className="mb-4">
                                    <NavLink
                                        to="/dashboard/profile"
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 p-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-700 text-white font-bold'
                                                : 'hover:bg-blue-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        <FaUser className="w-5 h-5" />
                                        <span>Organizer Profile</span>
                                    </NavLink>
                                </li>
                                <li className="mb-4">
                                    <NavLink
                                        to="/dashboard/addcamp"
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 p-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-700 text-white font-bold'
                                                : 'hover:bg-blue-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        <FaPlus className="w-5 h-5" />
                                        <span>Add A Camp</span>
                                    </NavLink>
                                </li>
                                <li className="mb-4">
                                    <NavLink
                                        to="/dashboard/manage"
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 p-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-700 text-white font-bold'
                                                : 'hover:bg-blue-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        <FaList className="w-5 h-5" />
                                        <span>Manage Camps</span>
                                    </NavLink>
                                </li>
                                <li className="mb-4">
                                    <NavLink
                                        to="/dashboard/mregister"
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 p-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-700 text-white font-bold'
                                                : 'hover:bg-blue-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        <FaRegRegistered className="w-5 h-5" />
                                        <span>Manage Registered Camps</span>
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="mb-4">
                                    <NavLink
                                        to="/dashboard/recharts"
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 p-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-700 text-white font-bold'
                                                : 'hover:bg-blue-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        <FaChartLine className="w-5 h-5" />
                                        <span>Analytics</span>
                                    </NavLink>
                                </li>
                                <li className="mb-4">
                                    <NavLink
                                        to="/dashboard/profile"
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 p-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-700 text-white font-bold'
                                                : 'hover:bg-blue-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        <FaUser className="w-5 h-5" />
                                        <span>Participant Profile</span>
                                    </NavLink>
                                </li>
                                <li className="mb-4">
                                    <NavLink
                                        to="/dashboard/registered"
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 p-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-700 text-white font-bold'
                                                : 'hover:bg-blue-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        <FaRegRegistered className="w-5 h-5" />
                                        <span>Registered Camps</span>
                                    </NavLink>
                                </li>
                                <li className="mb-4">
                                    <NavLink
                                        to="/dashboard/payhistory"
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 p-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-blue-700 text-white font-bold'
                                                : 'hover:bg-blue-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        <FaHistory className="w-5 h-5" />
                                        <span>Payment History</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                {/* Content Area */}

                <Outlet />
                <ToastContainer></ToastContainer>
            </div>
        </div>
    );
};

export default Dashboard;