import React, { useState } from 'react';

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        image: "https://via.placeholder.com/150",
        contact: "johndoe@example.com",
    });
    return (
        <div>
            <div className="flex-1 p-8">
                <h2 className="text-xl font-bold mb-4">Organizer Profile</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <img src={profile.image} alt="Profile" className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300" />
                    <p className="text-lg font-semibold text-gray-800">{profile.name}</p>
                    <p className="text-gray-600">{profile.contact}</p>
                    <button onClick={() => setIsModalOpen(true)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
                        Update
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Update Profile</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Name</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Image URL</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Contact</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300 ease-in-out">
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;