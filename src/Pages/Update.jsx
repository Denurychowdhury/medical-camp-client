import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Useaxiosecure from '../Hooks/Useaxiosecure';
const imageHostingKey = import.meta.env.VITE_IMAGE_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Update = () => {
    const [camp, setCamp] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const axiosSecure = Useaxiosecure()
    useEffect(() => {
        axiosSecure.get(`/camps/camp/${id}`)
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
        const location = form.location.value;
        const healthcareProfessionalName = form.professional.value;
        const participantCount = parseInt(form.count.value);
        const description = form.desc.value;

        const campinfo = { campName, image, campFees, date, location, healthcareProfessionalName, participantCount, description }
        console.log(campinfo);

        axios.patch(`https://medical-camp-server-nine.vercel.app/update-camp/${id}`, campinfo)
            .then(data => {
                console.log(data.data);
                navigate('/dashboard/manage')
            })
    }
    console.log(camp);
    return (
        <div className="inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg md:w-2/3 mx-auto relative overflow-y-auto">
                <h2 className="text-xl font-semibold text-blue-700 text-center mb-4">Update a Camp</h2>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    {/* Left Column */}
                    <div className=''>
                        <label className="block text-gray-700 font-semibold">Camp Name</label>
                        <input type="text" name="campname" defaultValue={camp.campName} className="w-full p-2 border rounded bg-gray-100" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Photo URL</label>
                        <input type="text" name="photo" defaultValue={camp.image} className="w-full p-2 border rounded bg-gray-100" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Camp Fees</label>
                        <input type="number" name="fees" defaultValue={camp.campFees} className="w-full p-2 border rounded bg-gray-100" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Date & Time</label>
                        <input type="datetime-local" name="date" defaultValue={camp.date} className="w-full p-2 border rounded bg-gray-100" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Location</label>
                        <input type="text" name="location" defaultValue={camp.location} className="w-full p-2 border rounded bg-gray-100" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Healthcare Professional</label>
                        <input type="text" name="professional" defaultValue={camp.healthcareProfessionalName} className="w-full p-2 border rounded bg-gray-100" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold">Participant Count</label>
                        <input type="number" name="count" defaultValue={camp.participantCount} className="w-full p-2 border rounded bg-gray-100" />
                    </div>

                    {/* Full Width Textarea */}
                    <div className="col-span-2">
                        <label className="block text-gray-700 font-semibold">Description</label>
                        <textarea name="desc" defaultValue={camp.description} className="w-full p-2 border rounded bg-gray-100"></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2">
                        <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>


    );
};

export default Update;