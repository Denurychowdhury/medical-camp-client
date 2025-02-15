import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiospublic';
import { authcontext } from '../Authprovider/Authprovider';

const PaymentHistory = () => {
    const { user } = useContext(authcontext)
    const axiospublic = useAxiosPublic()
    const [paymentHistory, setPayhistory] = useState([])
    useEffect(() => {
        if (user?.email) { // Check if user and user.email exist
            axiospublic.get(`/payment/history/${user.email}`)
                .then(response => {
                    console.log('Fetched Participation Data:', response.data);
                    setPayhistory(response.data); // Set the participation data
                })
                .catch(error => {
                    console.error('Error fetching participation data:', error);
                    // Optionally, handle the error (e.g., set an error state)
                });
        }
    }, [user, axiospublic]);
    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 border border-gray-300">Camp Name</th>
                            <th className="p-3 border border-gray-300">Camp Fees</th>
                            <th className="p-3 border border-gray-300">Payment Status</th>
                            <th className="p-3 border border-gray-300">Confirmation Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.length > 0 ? (
                            paymentHistory.map((payment) => (
                                <tr key={payment._id} className="text-center">
                                    <td className="p-3 border border-gray-300">{payment.campName}</td>
                                    <td className="p-3 border border-gray-300">${payment.price}</td>
                                    <td className="p-3 border border-gray-300">
                                        <span
                                            className={`px-2 py-1 rounded-full ${payment.paymentstatus === "Paid"
                                                ? "bg-green-200 text-green-800"
                                                : "bg-red-200 text-red-800"
                                                }`}
                                        >
                                            {payment.paymentstatus}
                                        </span>
                                    </td>
                                    <td className="p-3 border border-gray-300">
                                        <span
                                            className={`px-2 py-1 rounded-full ${payment.confirmationStatus === "Confirmed"
                                                ? "bg-green-200 text-green-800"
                                                : "bg-yellow-200 text-yellow-800"
                                                }`}
                                        >
                                            {payment.confirmstatus}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-3 text-center text-gray-500">
                                    No payment history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
