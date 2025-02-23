import React from 'react';
import { Link } from 'react-router-dom';

const Camp = ({ camp }) => {
    console.log(camp);
    return (
        <div className="p-2">
            <div
                key={camp.id}
                className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-xl bg-white"
            >
                {/* Camp Image */}
                <img
                    src={camp.image}
                    alt={camp.name}
                    className="w-full h-48 object-cover"
                />

                {/* Camp Details */}
                <div className="p-6">
                    {/* Camp Name */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{camp.name}</h3>

                    {/* Camp Metadata */}
                    <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium">Fees:</span> ${camp.campFees}</p>
                        <p><span className="font-medium">Date:</span> {camp.date}</p>
                        <p><span className="font-medium">Location:</span> {camp.location}</p>
                        <p><span className="font-medium">Healthcare Professional:</span> {camp.healthcareProfessionalName}</p>
                    </div>

                    {/* Participant Count */}
                    <p className="text-sm font-bold text-blue-600 mt-3">
                        Participants: {camp.participantCount}
                    </p>

                    {/* Details Button */}
                    <div className="mt-4">
                        <Link
                            to={`/details/${camp._id}`}
                            className="block w-full cursor-pointer text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Camp;