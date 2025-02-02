import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authcontext } from "../Authprovider/Authprovider";
import logo from '../assets/logo.png'
const Navbar = () => {
    const { user, logoutuser, theme, setTheme, setLoading } = useContext(authcontext);
    // const [user, setUser] = useState(null); // Replace with actual authentication logic
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle

    const handleLogout = () => {
        logoutuser()
    };


    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo + Website Name */}
                <Link to="/" className="flex items-center text-xl font-bold">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-12 w-32"
                    />
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <Link to="/available" className="hover:underline">
                        Available Camps
                    </Link>
                    {/* {!user && (
                        <Link to="/join-us" className="hover:underline">
                            Join Us
                        </Link>
                    )} */}
                </div>

                {/* Profile Section (when logged in) */}
                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center space-x-2"
                        >
                            <img
                                src={user.photo || "/default-profile.png"}
                                alt="Profile"
                                className="h-8 w-8 rounded-full border border-white"
                            />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute z-50 right-0 mt-2 bg-white text-black rounded-lg shadow-lg">
                                <div className="p-2 border-b">
                                    <span className="block font-medium">{user.displayName}</span>
                                </div>
                                <Link
                                    to="/dashboard"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="hidden md:inline-block bg-white text-blue-600 py-2 px-4 rounded-md hover:bg-gray-200"
                    >
                        Join Us
                    </Link>
                )}

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex items-center"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.75h16.5M3.75 12h16.5M3.75 18.25h16.5"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Links */}
            {isMenuOpen && (
                <div className="md:hidden mt-2 bg-blue-600 text-white">
                    <Link
                        to="/"
                        className="block px-4 py-2 hover:bg-blue-500"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/available-camps"
                        className="block px-4 py-2 hover:bg-blue-500"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Available Camps
                    </Link>
                    {!user && (
                        <Link
                            to="/join-us"
                            className="block px-4 py-2 hover:bg-blue-500"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Join Us
                        </Link>
                    )}
                    {user && (
                        <>
                            <Link
                                to="/dashboard"
                                className="block px-4 py-2 hover:bg-blue-500"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 hover:bg-blue-500"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
