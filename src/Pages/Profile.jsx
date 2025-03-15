import React, { useState, useContext } from 'react';
import { authcontext } from '../Authprovider/Authprovider';
import { Helmet } from 'react-helmet';

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, updateuserprofile, setUser, setLoading } = useContext(authcontext);

    const updateProfile = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading state

        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const info = {
            displayName: name,
            photoURL: photo,
        };

        try {
            await updateuserprofile(info); // Update Firebase user profile
            setUser((prevUser) => ({
                ...prevUser,
                displayName: name,
                photoURL: photo,
            }));
            setIsModalOpen(false); // Close modal after update
        } catch (error) {
            console.error('Profile update failed:', error);
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            <Helmet>
                <title>{`Medical Camp Pro - ${user?.displayName || 'Profile'}`}</title>
            </Helmet>

            {/* Profile Card */}
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl mt-6 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    {/* Profile Image and Info */}
                    <div className="flex flex-col md:flex-row items-center space-x-6">
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-md mb-4 md:mb-0">
                            <img
                                src={user?.photoURL || 'https://via.placeholder.com/150'}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">{user?.displayName || 'No Name Provided'}</h2>
                            <p className="text-md text-gray-600">{user?.email || 'No Email Provided'}</p>
                        </div>
                    </div>

                    {/* Update Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out mt-4 md:mt-0"
                    >
                        Update Profile
                    </button>
                </div>

                {/* Profile Information Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">About</h3>
                        <div className="flex justify-between">
                            <span className="text-gray-700 font-medium">UID:</span>
                            <span className="text-gray-600">{user?.uid || 'No UID Provided'}</span>
                        </div>
                        <div className="flex justify-between mt-4">
                            <span className="text-gray-700 font-medium">Account Created:</span>
                            <span className="text-gray-600">{user?.metadata?.creationTime || 'No Info'}</span>
                        </div>
                        <div className="flex justify-between mt-4">
                            <span className="text-gray-700 font-medium">Last Sign-In:</span>
                            <span className="text-gray-600">{user?.metadata?.lastSignInTime || 'No Info'}</span>
                        </div>
                    </div>

                    {/* Add more sections like 'Activity' */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
                        {/* Placeholder for activity details, can be customized */}
                        <p className="text-gray-600">No activity data available</p>
                    </div>
                </div>
            </div>

            {/* Modal for Profile Update */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md p-4">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 scale-100">
                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Update Profile</h2>

                        <form onSubmit={updateProfile} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    defaultValue={user?.displayName}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Image URL</label>
                                <input
                                    name="photo"
                                    type="text"
                                    defaultValue={user?.photoURL}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300 ease-in-out"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out shadow-md"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
