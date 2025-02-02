import React from 'react';
import { Link } from 'react-router-dom';

const Camp = ({ camp }) => {
    console.log(camp);
    return (
        <div className=" p-6">
            <div
                key={camp.id}
                className="rounded-2xl overflow-hidden shadow-lg border transform transition-transform hover:scale-105"
            >
                <img
                    src={camp.image}
                    alt={camp.name}
                    className="w-full h-40 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{camp.name}</h3>
                    <p className="text-sm text-gray-600">Fees: ${camp.campFees}</p>
                    <p className="text-sm text-gray-600">Date: {camp.date}</p>
                    <p className="text-sm text-gray-600">Location: {camp.location}</p>
                    <p className="text-sm text-gray-600">Healthcare Professional: {camp.healthcareProfessionalName}</p>
                    <p className="text-sm font-bold text-blue-600">
                        Participants: {camp.participantCount}
                    </p>
                    <button className='p-3 rounded-b-md bg-blue-600'>
                        <Link to={`/details/${camp._id}`}>Details</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Camp;