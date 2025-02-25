import React, { useState, useContext } from 'react';
import { authcontext } from '../Authprovider/Authprovider';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, updateuserprofile, setUser, setLoading } = useContext(authcontext);
    const navigate = useNavigate()


    const updateProfile = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading state if needed

        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const info = {
            displayName: name,
            photoURL: photo,
        };

        try {
            await updateuserprofile(info); // Ensure Firebase updates first
            setUser((prevUser) => ({
                ...prevUser,
                displayName: name, // Correct state update
                photoURL: photo,
            }));
            setIsModalOpen(false); // Close modal after update
        } catch (error) {
            console.error("Profile update failed:", error);
        } finally {
            setLoading(false); // Hide loading state
        }
    };


    return (
        <div>
            <div className="flex-1 p-8">
                <div>
                    <Helmet>
                        <title>{`Medical camp pro/${user.displayName}`}</title>
                    </Helmet>
                </div>
                <h2 className="text-xl font-bold mb-4">Organizer Profile</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300"
                    />
                    <p className="text-lg font-semibold text-gray-800">{user?.displayName || "No Name Provided"}</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        Update
                    </button>
                </div>
            </div>

            {/* Modal */}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md p-4">
                    <div className="bg-white/80 p-6 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 scale-100">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Update Profile</h2>

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

                            {/* Buttons */}
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
