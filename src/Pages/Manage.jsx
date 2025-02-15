import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Update from './Update';
import { Link } from 'react-router-dom';

const Manage = () => {
    const [camps, setCamps] = useState([])
    const [paystatus, setPaystatus] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/camps')
            .then(data => {
                console.log(data.data);
                setCamps(data.data)
            })

        // axios.get('http://localhost:5000/paymentstatus')
        //     .then(data => {
        //         console.log(data.data);
        //         setPaystatus(data.data)
        //     })
    }, [])


    const handleDelete = id => {
        axios.delete(`http://localhost:5000/camp/delete/${id}`)
            .then(data => {
                const remaining = camps.filter(c => c._id == id)
                setCamps(remaining)
            })
    }
    return (
        <div className="overflow-x-auto">

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Date & Time</th>
                        <th className="py-2 px-4 border-b">Location</th>
                        <th className="py-2 px-4 border-b">Healthcare Professional</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {camps && camps.map((camp) => (
                        <tr key={camp.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{camp.campName}</td>
                            <td className="py-2 px-4 border-b">{camp.date}</td>
                            <td className="py-2 px-4 border-b">{camp.location}</td>
                            <td className="py-2 px-4 border-b">{camp.healthcareProfessionalName}</td>
                            <td className="py-2 px-4 border-b">
                                <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                                    <Link to={`/dashboard/update/${camp._id}`}>Update</Link>
                                </button>
                                <button onClick={() => handleDelete(camp._id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Manage;