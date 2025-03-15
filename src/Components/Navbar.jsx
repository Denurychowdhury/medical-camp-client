import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authcontext } from "../Authprovider/Authprovider";
import logo from '../assets/logo.png';

const Navbar = () => {
    const { user, logoutuser } = useContext(authcontext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        logoutuser();
        setIsDropdownOpen(false);
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center text-xl font-bold">
                    <img src={logo} alt="Logo" className="h-12 w-32" />
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6 text-lg font-medium">
                    <Link to="/" className="hover:text-gray-200 transition">Home</Link>
                    <Link to="/available" className="hover:text-gray-200 transition">Available Camps</Link>
                </div>

                {/* User Profile & Authentication */}
                <div className="relative flex items-center">
                    {user ? (
                        <div className="relative">
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                                <img src={user.photoURL || "/default-profile.png"} alt="Profile" className="h-10 w-10 rounded-full border border-white" />
                            </button>
                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
                                    <span className="block px-4 py-2 font-medium border-b">{user.displayName}</span>
                                    <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="hidden md:inline-block bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-200 transition">Join Us</Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-blue-600 text-white mt-2 space-y-2 py-2 text-center">
                    <Link to="/" className="block py-2 hover:bg-blue-500" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/available" className="block py-2 hover:bg-blue-500" onClick={() => setIsMenuOpen(false)}>Available Camps</Link>
                    {!user ? (
                        <Link to="/login" className="block py-2 hover:bg-blue-500" onClick={() => setIsMenuOpen(false)}>Join Us</Link>
                    ) : (
                        <>
                            <Link to="/dashboard" className="block py-2 hover:bg-blue-500" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                            <button onClick={handleLogout} className="block w-full text-left py-2 hover:bg-blue-500">Logout</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;