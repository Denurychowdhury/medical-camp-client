import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { authcontext } from "../Authprovider/Authprovider";
import Useaxiosecure from "../Hooks/Useaxiosecure";

const Campdetails = () => {
    const { user } = useContext(authcontext);
    const { id } = useParams();
    const axiosSecure = Useaxiosecure();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        age: "",
        phoneNumber: "",
        gender: "",
        emergencyContact: "",
    });

    // Fetch camp details using TanStack Query
    const { data: camp, error, isLoading } = useQuery({
        queryKey: ["camp", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/camps/camp/${id}`);
            return data;
        },
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) return <p className="text-center text-gray-600">Fetching camp details...</p>;
    if (error) return <p className="text-center text-red-500">Oops! Something went wrong.</p>;

    // Toggle the registration modal
    const toggleModal = () => setShowModal(!showModal);

    // Handle input changes in the form
    const updateFormData = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Submit registration
    const registerForCamp = async (e) => {
        e.preventDefault();

        const participantInfo = {
            role: "participant",
            status: "pending",
            paymentstatus: "unpaid",
            campName: camp.campName,
            campFees: camp.campFees,
            location: camp.location,
            participantName: user?.displayName || "Anonymous",
            participantEmail: user?.email || "No Email",
            ...formData,
        };

        try {
            await axios.post("https://medical-camp-server-nine.vercel.app/participate", participantInfo);
            toast.success("You're successfully registered!");
            setShowModal(false);
        } catch {
            toast.error("Couldn't register. Try again.");
        }
    };

    // Increase participant count
    const increaseParticipantCount = async () => {
        await axios.put(`https://medical-camp-server-nine.vercel.app/camps/part/${camp._id}`);
    };

    return (
        <div className="md:container mx-auto md:p-6 p-2 bg-gray-50 rounded-lg shadow-lg">
            <div>
                <Helmet>
                    <title>{`Medical camp pro/${camp.campName}/details`}</title>
                    <meta name="description" content="Nested component" />
                </Helmet>
            </div>
            <div className="mb-6 p-6 bg-gray-100 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-blue-600">{camp.campName}</h4>
                <img src={camp.image} alt="Camp" className="w-full h-64 object-cover rounded-md mt-4" />
                <h3 className="text-lg font-semibold">{camp.name}</h3>
                <p className="text-sm text-gray-600">Fees: ${camp.campFees}</p>
                <p className="text-sm text-gray-600">Date: {camp.date}</p>
                <p className="text-sm text-gray-600">Location: {camp.location}</p>
                <p className="text-sm text-gray-600">Healthcare Professional: {camp.healthcareProfessionalName}</p>
                <p className="text-sm font-bold text-blue-600">Participants: {camp.participantCount}</p>

                <button
                    onClick={toggleModal}
                    className="mt-6 py-2 px-6 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 transition duration-300"
                >
                    Join Camp
                </button>
            </div>

            {/* Registration Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg md:w-1/2 mx-auto relative max-h-[80vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold text-blue-700 text-center mb-4">Register for {camp.campName}</h2>
                        <form onSubmit={registerForCamp} className="space-y-3">
                            {/* Read-only fields */}
                            <label>Camp Name</label>
                            <input type="text" value={camp.campName} readOnly className="w-full p-2 border rounded bg-gray-100" />

                            <label>Camp Fees</label>
                            <input type="text" value={camp.campFees} readOnly className="w-full p-2 border rounded bg-gray-100" />

                            <label>Camp Location</label>
                            <input type="text" value={camp.location} readOnly className="w-full p-2 border rounded bg-gray-100" />

                            <label>Participant Name</label>
                            <input type="text" value={user?.displayName || ""} readOnly className="w-full p-2 border rounded bg-gray-100" />

                            <label>Participant Email</label>
                            <input type="email" value={user?.email || ""} readOnly className="w-full p-2 border rounded bg-gray-100" />

                            {/* Editable fields */}
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={updateFormData}
                                className="w-full p-2 border rounded"
                                placeholder="Your Age"
                                required
                            />

                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={updateFormData}
                                className="w-full p-2 border rounded"
                                placeholder="Phone Number"
                                required
                            />

                            <label>Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={updateFormData}
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>

                            <label>Emergency Contact</label>
                            <input
                                type="text"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={updateFormData}
                                className="w-full p-2 border rounded"
                                placeholder="Emergency Contact"
                                required
                            />

                            <button
                                onClick={increaseParticipantCount}
                                type="submit"
                                className="w-full p-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700"
                            >
                                Register Now
                            </button>
                        </form>

                        <button onClick={toggleModal} className="absolute top-2 right-3 text-gray-500 text-xl">&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Campdetails;
