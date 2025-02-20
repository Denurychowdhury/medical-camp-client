import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiospublic';

import axios from 'axios';
import { authcontext } from '../Authprovider/Authprovider';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import FeedbackModal from '../Components/FeedbackModal';
import Useaxiosecure, { axiosSecure } from '../Hooks/Useaxiosecure';

const Registered = () => {
    const { user } = useContext(authcontext);
    const axiosSecure = Useaxiosecure()
    console.log(user);
    const [part, setPart] = useState([])
    const [isModalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/participate/${user.email}`)
                .then(response => {
                    console.log('Fetched Participation Data:', response.data);
                    setPart(response.data);
                })
                .catch(error => {
                    console.error('Error fetching participation data:', error);

                });
        }
    }, [user]);

    const participate = () => {
        const { refetch, data: participates = {} } = useQuery({
            queryKey: ['participates', user?.email],
            queryFn: async () => {
                if (!user?.email) return {};
                const { data } = await useAxiosPublic.get(`/participate?email=${user.email}`);
                return data[0];
            },
            enabled: !!user?.email,
            staleTime: 5 * 60 * 1000,
        });

        return [participates, refetch];
    };
    const [participates, refetch] = participate()
    console.log(participates);


    const handleCancel = async (id) => {
        try {
            const res = await axiospublic.delete(`/participate/delete/${id}`);
            console.log(res.data);

            const filteredParticipants = part.filter(part => part._id !== id);
            setPart(filteredParticipants);

            toast.success('Participant removed successfully');
        } catch (error) {
            console.error('Error deleting participant:', error);
            toast.error('Failed to remove participant');
        }
    };
    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Registered Camps</h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left">Camp Name</th>
                        <th className="p-4 text-left">Camp Fees</th>
                        <th className="p-4 text-left">Participant Name</th>
                        <th className="p-4 text-left">Payment Status</th>
                        <th className="p-4 text-left">Confirmation Status</th>
                        <th className="p-4 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {part.map((camp) => (
                        <tr key={camp._id} className="border-b hover:bg-gray-50">
                            <td className="p-4">{camp.campName}</td>
                            <td className="p-4">{`${camp.campFees}`}</td>
                            <td className="p-4">{camp.participantName}</td>
                            <td className="p-4">
                                <Link to={`/dashboard/pay/${camp._id}`}>
                                    <button disabled={camp.paymentstatus == 'paid'} className='bg-amber-300 text-blue-400 p-2 text-xl'>
                                        {camp.paymentstatus == 'paid' ? 'paid' : 'Pay'}
                                    </button>
                                </Link>
                            </td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded ${camp.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {camp.status}
                                </span>
                            </td>
                            <td>
                                <div class="flex space-x-4">
                                    <button onClick={() => handleCancel(camp._id)} disabled={camp.paymentstatus == 'paid'} class="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-300">
                                        Cancel
                                    </button>
                                    <div>
                                        {camp.status === "confirmed" && camp.paymentstatus === "paid" ? (
                                            <button
                                                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                                                onClick={() => setModalOpen(true)} // Open the modal
                                            >
                                                Feedback
                                            </button>
                                        ) : null}
                                    </div>
                                    <FeedbackModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Registered;
