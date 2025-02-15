import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { data, useParams } from 'react-router-dom';
const imageHostingKey = import.meta.env.VITE_IMAGE_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Update = () => {
    const [camp, setCamp] = useState({})
    const { id } = useParams()
    useEffect(() => {
        axios.get(`http://localhost:5000/camps/${id}`)
            .then(data => {
                console.log(data.data);
                setCamp(data.data)
            })
    }, [])
    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target;
        const campName = form.campname.value;
        const image = form.photo.value;
        const campFees = form.fees.value;
        const date = form.date.value;
        const location = form.location.name;
        const healthcareProfessionalName = form.professional.value;
        const participantCount = form.count.value;
        const description = form.desc.value;

        const campinfo = { campName, image, campFees, date, location, healthcareProfessionalName, participantCount, description }
        console.log(campinfo);

        axios.patch(`http://localhost:5000/update-camp/${id}`, campinfo)
            .then(data => {
                console.log(data.data);
            })
    }
    console.log(camp);
    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mx-auto relative  overflow-y-auto">
                <h2 className="text-xl font-semibold text-blue-700 text-center mb-4">Update a Camp</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Read-only fields */}
                    <input type="text" name='campname' defaultValue={camp.campName} className="w-full p-2 border rounded bg-gray-100" />
                    <input type="text" name='photo' defaultValue={camp.image} className="w-full p-2 border rounded bg-gray-100" />
                    <input type="number" name='fees' defaultValue={camp.campFees} className="w-full p-2 border rounded bg-gray-100" />
                    <input type="datetime-local" name='date' defaultValue={camp.date} className="w-full p-2 border rounded bg-gray-100" />
                    <input type="text" name='location' defaultValue={camp.location} className="w-full p-2 border rounded bg-gray-100" />
                    <input type="text" name='professional' defaultValue={camp.healthcareProfessionalName} className="w-full p-2 border rounded bg-gray-100" />
                    <input type="number" name='count' defaultValue={camp.participantCount} className="w-full p-2 border rounded bg-gray-100" />
                    <textarea name='desc' defaultValue={camp.description} className="w-full p-2 border rounded bg-gray-100"></textarea>
                    {/* Editable fields */}
                    <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Update;