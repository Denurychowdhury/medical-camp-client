import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Popular = () => {
    const [popularCamps, setPopularCamps] = useState([]);

    useEffect(() => {
        // Sort camps by participant count in descending order and take the top 6
        axios.get('http://localhost:5000/homecamps')
            .then(data => {
                setPopularCamps(data.data)
            })
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Popular Medical Camps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {popularCamps.map((camp) => (
                    <div
                        key={camp._id}
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
                ))}
            </div>
            <div className="mt-6 flex justify-center">
                <Link to="/available">
                    <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        See All Camps
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Popular;
