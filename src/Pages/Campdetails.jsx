import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authcontext } from "../Authprovider/Authprovider";
import { toast } from "react-toastify";

const Campdetails = () => {
    const [camp, setCamp] = useState(null);
    const { user } = useContext(authcontext);
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        age: "",
        phoneNumber: "",
        gender: "",
        emergencyContact: "",
    });


    useEffect(() => {
        axios.get(`http://localhost:5000/camps/${id}`)
            .then(response => {
                console.log("Camp Data:", response.data);
                setCamp(response.data);
            })
            .catch(error => {
                console.error("Error fetching camp data:", error);
            });
    }, [id]);

    if (!camp) return <p className="text-center text-gray-600">Loading camp details...</p>;

    // Handle modal toggle
    const handleModalToggle = () => setShowModal(!showModal);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const submissionData = {
            role: 'participent',
            status: 'pending',
            paymentstatus: 'unpaid',
            campName: camp.campName,
            campFees: camp.campFees,
            location: camp.location,
            participantName: user.displayName || "Anonymous",
            participantEmail: user.email || "No Email",
            ...formData,
        };

        console.log("Submitted Participant Info:", submissionData);

        axios.post('http://localhost:5000/participate', submissionData)
            .then(response => {
                console.log("Registration successful:", response.data);
                toast.success("Registration Successful!");
                setShowModal(false);
            })
            .catch(error => {
                console.error("Registration failed:", error);
                alert("Registration Failed! Please try again.");
            });
    };

    const handleincrease = (id) => {
        axios.put(`http://localhost:5000/camps/part/${id}`)
    }
    return (
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
            <div className="mb-6 p-6 bg-gray-100 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-600">{camp.campName}</h4>
                <img src={camp.image} alt="Camp Image" className="w-full h-64 object-cover rounded-md mt-4" />
                <h3 className="text-lg font-semibold">{camp.name}</h3>
                <p className="text-sm text-gray-600">Fees: ${camp.campFees}</p>
                <p className="text-sm text-gray-600">Date: {camp.date}</p>
                <p className="text-sm text-gray-600">Location: {camp.location}</p>
                <p className="text-sm text-gray-600">Healthcare Professional: {camp.healthcareProfessionalName}</p>
                <p className="text-sm font-bold text-blue-600">Participants: {camp.participantCount}</p>

                <button
                    onClick={handleModalToggle}
                    className="mt-6 py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                    Join Camp
                </button>
            </div>

            {/* Modal for Registration */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mx-auto relative max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold text-blue-700 text-center mb-4">Register for Camp</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* Read-only fields */}
                            <input type="text" value={camp.campName} readOnly className="w-full p-2 border rounded bg-gray-100" />
                            <input type="text" value={camp.campFees} readOnly className="w-full p-2 border rounded bg-gray-100" />
                            <input type="text" value={camp.location} readOnly className="w-full p-2 border rounded bg-gray-100" />
                            <input type="text" value={user?.displayName || ""} readOnly className="w-full p-2 border rounded bg-gray-100" />
                            <input type="email" value={user?.email || ""} readOnly className="w-full p-2 border rounded bg-gray-100" />

                            {/* Editable fields */}
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                placeholder="Age"
                                required
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                placeholder="Phone Number"
                                required
                            />
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <input
                                type="text"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                placeholder="Emergency Contact"
                                required
                            />
                            <button onClick={() => handleincrease(camp._id)} type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
                                Submit
                            </button>
                        </form>
                        <button onClick={handleModalToggle} className="absolute top-2 right-3 text-gray-500 text-xl">&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Campdetails;
