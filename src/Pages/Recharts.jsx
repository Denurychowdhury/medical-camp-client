import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { authcontext } from '../Authprovider/Authprovider';
import Useaxiosecure from '../Hooks/Useaxiosecure';

const Recharts = () => {
    const { user } = useContext(authcontext);
    const [reg, setReg] = useState([]);
    const axiosSecure = Useaxiosecure()
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/participate/${user.email}`)
                .then(response => {
                    setReg(response.data);
                })
                .catch(error => console.error("Error fetching data:", error));
        }
    }, [user?.email]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Participant Analytics</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={reg} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="campName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="campFees" fill="#8884d8" name="Camp Fees" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Recharts;
