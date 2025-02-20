import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { PiTextColumnsBold } from "react-icons/pi";
import Camp from '../Components/Camp';
const Available = () => {

    const [camps, setCamps] = useState([])

    const [search, setSearch] = useState('');
    const [layout, setLayout] = useState('lg:grid-cols-3');
    const [sortOption, setSortOption] = useState('alphabetical');

    useEffect(() => {
        axios.get(`https://medical-camp-server-nine.vercel.app/camps/?search=${search}`)
            .then(data => {
                console.log(data);
                setCamps(data.data)
            })
    }, [search])
    // Filter camps based on search termhe
    const filteredCamps = camps.filter((camp) =>
        camp.campName.toLowerCase().includes(search.toLowerCase())
    );

    // Sort camps based on selected option
    const sortedCamps = filteredCamps.sort((a, b) => {
        if (sortOption === 'most-registered') {
            return b.participantCount - a.participantCount;
        } else if (sortOption === 'camp-fees') {
            return a.campFees - b.campFees;
        } else {
            return a.campName.localeCompare(b.campName);
        }
    });
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Available Camps</h2>

            {/* Search, Sort, and Layout Controls */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Search Input */}
                <form className="w-full md:w-auto flex items-center">
                    <input
                        className="input input-bordered w-full md:w-64 lg:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Search for camps..."
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        type="text"
                    />
                </form>

                {/* Sorting Dropdown */}
                <label></label>
                <select
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    onChange={(e) => setSortOption(e.target.value)}
                    value={sortOption}
                >
                    <option value="alphabetical">Alphabetical</option>
                    <option value="most-registered">Most Registered</option>
                    <option value="camp-fees">Camp Fees</option>
                </select>

                {/* Layout Toggle Button */}
                <button
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all flex items-center space-x-2"
                    onClick={() => setLayout(layout === 'lg:grid-cols-3' ? 'lg:grid-cols-2' : 'lg:grid-cols-3')}
                >
                    {layout === 'lg:grid-cols-3' ? (
                        <>
                            <PiTextColumnsBold />
                        </>
                    ) : (
                        <>
                            <BsFillGrid3X3GapFill />
                        </>
                    )}
                </button>
            </div>

            {/* Camp Cards Grid */}
            <div className={`grid ${layout} md:grid-cols-2 grid-cols-1 gap-6`}>
                {sortedCamps.map((camp) => (
                    <div
                        key={camp._id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <Camp camp={camp} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Available;