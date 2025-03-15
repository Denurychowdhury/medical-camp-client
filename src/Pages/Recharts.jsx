import React, { useContext, useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { authcontext } from '../Authprovider/Authprovider';
import Useaxiosecure from '../Hooks/Useaxiosecure';

const Recharts = () => {
    const { user } = useContext(authcontext);
    const [reg, setReg] = useState([]);
    const axiosSecure = Useaxiosecure();

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
        <div className="p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-lg shadow-xl text-white">
            <h2 className="text-3xl font-semibold mb-6 text-center">Participant Analytics</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={reg} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#fff" />
                    <XAxis dataKey="campName" tick={{ fill: '#fff' }} />
                    <YAxis tick={{ fill: '#fff' }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#2b2b2b', borderRadius: '5px' }}
                        itemStyle={{ color: '#fff' }}
                        isAnimationActive={false} // Disable animation on tooltip hover
                    />
                    <Legend wrapperStyle={{ color: '#fff', marginTop: -10 }} />
                    <Bar
                        dataKey="campFees"
                        fill="#ff7300"
                        name="Camp Fees"
                        animationDuration={1500}
                        barSize={30}
                        // Disable gray background effect on hover by setting the active prop to false
                        activeDot={false}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Recharts;
