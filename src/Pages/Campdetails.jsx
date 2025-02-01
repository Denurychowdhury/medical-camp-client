import React, { useState } from "react";

const Campdetails = ({ campData }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        participantName: "",
        participantEmail: "",
        age: "",
        phoneNumber: "",
        gender: "",
        emergencyContact: "",
    });

    // Mock logged-in user data
    const loggedInUser = { name: "John Doe", email: "john@example.com" };

    const handleModalToggle = () => setShowModal(!showModal);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Participant Info Submitted:", formData);
        setShowModal(false); // Close modal after submission
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            {campData?.length > 0 && campData.map((camp, index) => (
                <div key={index} className="mb-6 p-6 bg-gray-100 rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold text-blue-600">{camp.campName}</h4>
                    <img
                        src={camp.image}
                        alt="Camp Image"
                        className="w-full h-64 object-cover rounded-md mt-4"
                    />
                    <p className="mt-4">{camp.description}</p>
                    <p className="mt-2">Camp Fees: ${camp.campFees}</p>
                    <p className="mt-2">Date & Time: {new Date(camp.date).toLocaleString()}</p>
                    <p className="mt-2">Location: {camp.location}</p>
                    <p className="mt-2">Healthcare Professional: {camp.healthcareProfessionalName}</p>
                    <p className="mt-2">Participants: {camp.participantCount}</p>

                    {/* Join Camp Button */}
                    <button
                        onClick={handleModalToggle}
                        className="mt-6 py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                    >
                        Join Camp
                    </button>
                </div>
            ))}

            {/* Modal for Participant Registration */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">Register for Camp</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="campName">
                                    Camp Name
                                </label>
                                <input
                                    type="text"
                                    id="campName"
                                    name="campName"
                                    value={campData[0]?.campName || ""}
                                    readOnly
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="campFees">
                                    Camp Fees
                                </label>
                                <input
                                    type="text"
                                    id="campFees"
                                    name="campFees"
                                    value={campData[0]?.campFees || ""}
                                    readOnly
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={campData[0]?.location || ""}
                                    readOnly
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="healthcareProfessionalName">
                                    Healthcare Professional Name
                                </label>
                                <input
                                    type="text"
                                    id="healthcareProfessionalName"
                                    name="healthcareProfessionalName"
                                    value={campData[0]?.healthcareProfessionalName || ""}
                                    readOnly
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            {/* Participant Information */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="participantName">
                                    Participant Name
                                </label>
                                <input
                                    type="text"
                                    id="participantName"
                                    name="participantName"
                                    value={loggedInUser.name}
                                    readOnly
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="participantEmail">
                                    Participant Email
                                </label>
                                <input
                                    type="email"
                                    id="participantEmail"
                                    name="participantEmail"
                                    value={loggedInUser.email}
                                    readOnly
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="age">
                                    Age
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="phoneNumber">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="gender">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="emergencyContact">
                                    Emergency Contact
                                </label>
                                <input
                                    type="text"
                                    id="emergencyContact"
                                    name="emergencyContact"
                                    value={formData.emergencyContact}
                                    onChange={handleInputChange}
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                                >
                                    Submit Registration
                                </button>
                            </div>
                        </form>
                        <button
                            onClick={handleModalToggle}
                            className="absolute top-4 right-4 text-gray-500"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Campdetails;
