import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiospublic';
import { authcontext } from '../Authprovider/Authprovider';

const PaymentHistory = () => {
    const { user } = useContext(authcontext)
    const axiospublic = useAxiosPublic()
    const [paymentHistory, setPayhistory] = useState([])

    useEffect(() => {
        if (user?.email) {
            axiospublic.get(`/payment/history/${user.email}`)
                .then(response => {
                    console.log('Fetched Participation Data:', response.data);
                    setPayhistory(response.data);
                })
                .catch(error => {
                    console.error('Error fetching participation data:', error);
                });
        }
    }, [user, axiospublic]);

    return (
        <div className="container mx-auto md:mt-8 mt-4 px-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Payment History</h2>
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="table-auto w-full border-collapse text-sm text-gray-700">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="p-4 text-left border-b">Camp Name</th>
                                <th className="p-4 text-right border-b">Camp Fees</th>
                                <th className="p-4 text-center border-b">Payment Status</th>
                                <th className="p-4 text-center border-b">Confirmation Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.length > 0 ? (
                                paymentHistory.map((payment) => (
                                    <tr key={payment._id} className="hover:bg-gray-100 transition duration-300">
                                        <td className="p-4 text-left border-b">{payment.campName}</td>
                                        <td className="p-4 text-right border-b">${payment.price}</td>
                                        <td className="p-4 text-center border-b">
                                            <span
                                                className={`px-3 py-1 rounded-full font-medium ${payment.paymentstatus === "Paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {payment.paymentstatus}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center border-b">
                                            <span
                                                className={`px-3 py-1 rounded-full font-medium ${payment.confirmationStatus === "Confirmed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {payment.confirmstatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-500">
                                        No payment history found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
