import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';


const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-blue-800 text-white p-4">
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
                                to="/manage-camps"
                                className={({ isActive }) => isActive ? "text-blue-300 font-bold" : "hover:text-blue-300"}
                            >
                                Manage Camps
                            </NavLink>
                        </li>
                        <li className="mb-4">
                            <NavLink
                                to="/manage-registered-camps"
                                className={({ isActive }) => isActive ? "text-blue-300 font-bold" : "hover:text-blue-300"}
                            >
                                Manage Registered Camps
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="w-full p-8">
                {/* Content will be rendered here based on the route */}
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;