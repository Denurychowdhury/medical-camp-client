import React from 'react';

const CampTable = ({ camp }) => {
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
                    <tr key={camp.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{camp.campName}</td>
                        <td className="py-2 px-4 border-b">{camp.date}</td>
                        <td className="py-2 px-4 border-b">{camp.location}</td>
                        <td className="py-2 px-4 border-b">{camp.healthcareProfessionalName}</td>
                        <td className="py-2 px-4 border-b">
                            <button className="bg-blue-500 text-white py-1 cursor-pointer px-3 rounded hover:bg-blue-600">
                                Update
                            </button>
                            <button onClick={() => handleDelete(camp._id)} className="bg-red-500 cursor-pointer text-white py-1 px-3 rounded hover:bg-red-600 ml-2">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CampTable;