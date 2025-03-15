import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Popular = () => {
    const [popularCamps, setPopularCamps] = useState([]);

    useEffect(() => {
        axios.get('https://medical-camp-server-nine.vercel.app/homecamps')
            .then(response => setPopularCamps(response.data))
            .catch(error => console.error("Error fetching camps:", error));
    }, []);

    return (
        <div className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Popular Medical Camps
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {popularCamps.map((camp) => (
                    <div
                        key={camp._id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                    >
                        <img
                            src={camp.image}
                            alt={camp.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{camp.name}</h3>
                            <p className="text-gray-600 text-sm">Fees: <span className="font-medium text-gray-800">${camp.campFees}</span></p>
                            <p className="text-gray-600 text-sm">Date: <span className="font-medium text-gray-800">{camp.date}</span></p>
                            <p className="text-gray-600 text-sm">Location: <span className="font-medium text-gray-800">{camp.location}</span></p>
                            <p className="text-gray-600 text-sm">Healthcare Professional: <span className="font-medium text-gray-800">{camp.healthcareProfessionalName}</span></p>
                            <p className="text-blue-600 font-semibold text-sm mt-2">Participants: {camp.participantCount}</p>
                            <Link to={`/details/${camp._id}`}>
                                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-10 flex justify-center">
                <Link to="/available">
                    <button className="px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md hover:opacity-90 transition-all">
                        See All Camps
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Popular;
