import React, { useState, useContext } from 'react';
import { authcontext } from '../Authprovider/Authprovider';

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, updateuserprofile } = useContext(authcontext); // Assuming updateUserProfile is available in authcontext

    const [profileData, setProfileData] = useState({
        name: user?.displayName || "",
        photo: user?.photoURL || "",
        contact: "", // Fetch and prefill from Firestore if available
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            await updateuserprofile({
                displayName: profileData.name,
                photoURL: profileData.photo,
                // Add contact info update if needed (store in Firestore if it's not part of auth)
            });
            console.log("Profile updated successfully");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    return (
        <div>
            <div className="flex-1 p-8">
                <h2 className="text-xl font-bold mb-4">Organizer Profile</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <img
                        src={profileData.photo || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300"
                    />
                    <p className="text-lg font-semibold text-gray-800">{profileData.name || "No Name Provided"}</p>
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Update Profile</h2>
                        <form onSubmit={updateProfile}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={profileData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">Image URL</label>
                                <input
                                    name="photo"
                                    type="text"
                                    value={profileData.photo}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">Contact</label>
                                <input
                                    name="contact"
                                    type="text"
                                    value={profileData.contact}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300 ease-in-out"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
                                >
                                    Save
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
