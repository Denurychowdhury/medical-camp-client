import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiospublic';
import { setPersistence } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet';

const Mregister = () => {
    const axiospublic = useAxiosPublic()
    const [participants, setParticipantes] = useState([])
    const [paid, setPaid] = useState(null)
    useEffect(() => {
        axiospublic.get(`/participate`)
            .then(res => {
                console.log(res.data);
                setParticipantes(res.data)
            })
    }, [])


    const hanldeStatus = async (id) => {
        try {
            const res = await axiospublic.get(`/participate/single/${id}`);
            const paymentStatus = res.data.paymentstatus;

            if (paymentStatus === "unpaid") {
                toast.error('Participant has not paid');
                return;
            }

            const updateRes = await axiospublic.patch(`/participate/update/${id}`, { status: "confirmed" });
            if (updateRes.data.modifiedCount > 0) {
                setParticipantes(prevParticipants =>
                    prevParticipants.map(participant =>
                        participant._id === id ? { ...participant, status: "confirmed" } : participant
                    )
                );
                toast.success('Status updated to confirmed');
            }
        } catch (error) {
            toast.error('Error updating status:', error);
        }
    }

    const handleCancel = async (id) => {
        try {
            const res = await axiospublic.delete(`/participate/delete/${id}`);
            console.log(res.data);
            const filteredParticipants = participants.filter(part => part._id !== id);
            setParticipantes(filteredParticipants);

            toast.success('Participant removed successfully');
        } catch (error) {
            console.error('Error deleting participant:', error);
            toast.error('Failed to remove participant');
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <div>
                <Helmet>
                    <title>Medical camp pro/Manage register</title>
                    <meta name="description" content="Nested component" />
                </Helmet>
            </div>
            <h2 className="text-2xl font-bold mb-4">Registered Camps</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 border border-gray-300">Camp Name</th>
                            <th className="p-3 border border-gray-300">Camp Fees</th>
                            <th className="p-3 border border-gray-300">Participant Name</th>
                            <th className="p-3 border border-gray-300">Payment Status</th>
                            <th className="p-3 border border-gray-300">Confirmation Status</th>
                            <th className="p-3 border border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((participant) => (
                            <tr key={participant.id} className="text-center">
                                <td className="p-3 border border-gray-300">{participant.campName}</td>
                                <td className="p-3 border border-gray-300">${participant.campFees}</td>
                                <td className="p-3 border border-gray-300">{participant.participantName}</td>
                                <td className="p-3 border border-gray-300">
                                    <span
                                        className={`px-2 py-1 rounded-full ${participant.paymentStatus === "Paid"
                                            ? "bg-green-200 text-green-800"
                                            : "bg-red-200 text-red-800"
                                            }`}
                                    >
                                        {participant.paymentstatus}
                                    </span>
                                </td>
                                <td className="p-3 border border-gray-300">
                                    <button
                                        onClick={() => hanldeStatus(participant._id)}
                                        className={`px-3 py-1 rounded-lg ${participant.status === "confirmed"
                                            ? "bg-green-400 text-white cursor-not-allowed"
                                            : "bg-yellow-400 text-white"
                                            }`}
                                        disabled={participant.status === "confirmed"}
                                    >
                                        {participant.status}
                                    </button>
                                </td>
                                <td className="p-3 border border-gray-300">
                                    <button
                                        onClick={() => handleCancel(participant._id)}
                                        className={`px-3 py-1 rounded-lg ${participant.paymentStatus === "paid" &&
                                            participant.confirmationStatus === "Confirmed"
                                            ? "bg-gray-400 text-white cursor-not-allowed"
                                            : "bg-red-500 text-white"
                                            }`}
                                        disabled={
                                            participant.paymentstatus === "paid" &&
                                            participant.status === "confirmed"
                                        }
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Mregister;