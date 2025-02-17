import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Manage = () => {
    // State for camps data
    const [camps, setCamps] = useState([]);

    // State for search input
    const [search, setSearch] = useState('');

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    // Fetch camps data from the server
    useEffect(() => {
        axios.get(`http://localhost:5000/camps/?search=${search}`)
            .then((response) => {
                console.log(response.data);
                setCamps(response.data);
            })
            .catch((error) => {
                console.error('Error fetching camps:', error);
            });
    }, [search]);

    // Handle camp deletion
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/camp/delete/${id}`)
            .then(() => {
                // Remove the deleted camp from the state
                const remainingCamps = camps.filter((camp) => camp._id !== id);
                setCamps(remainingCamps);
            })
            .catch((error) => {
                console.error('Error deleting camp:', error);
            });
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage; // Index of the last item on the current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Index of the first item on the current page
    const currentCamps = camps.slice(indexOfFirstItem, indexOfLastItem); // Items to display on the current page

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-6">
            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search for camps..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-64 lg:w-96 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Table to display camps */}
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
                        {currentCamps.map((camp) => (
                            <tr key={camp._id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{camp.campName}</td>
                                <td className="py-2 px-4 border-b">{camp.date}</td>
                                <td className="py-2 px-4 border-b">{camp.location}</td>
                                <td className="py-2 px-4 border-b">{camp.healthcareProfessionalName}</td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                                        <Link to={`/dashboard/update/${camp._id}`}>Update</Link>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(camp._id)}
                                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
                {/* Items per page dropdown */}
                <div>
                    <label className="mr-2">Items per page:</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1); // Reset to the first page when changing items per page
                        }}
                        className="p-2 border rounded"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>

                {/* Pagination buttons */}
                <nav>
                    <ul className="flex space-x-2">
                        {Array.from({ length: Math.ceil(camps.length / itemsPerPage) }, (_, i) => (
                            <li key={i + 1}>
                                <button
                                    onClick={() => paginate(i + 1)}
                                    className={`px-4 py-2 border rounded ${currentPage === i + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-blue-500 hover:bg-blue-100'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Manage;