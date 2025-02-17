import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiospublic';
import { dark } from '@mui/material/styles/createPalette';

const Feedback = () => {
    const axiospublic = useAxiosPublic()
    const [feedbackdata, setFeedbackdata] = useState([])
    useEffect(() => {
        axiospublic.get('/feedbacks')
            .then(res => {
                console.log(res.data);
                setFeedbackdata(res.data)
            })
    }, [])
    console.log(feedbackdata);
    return (
        <div className="mx-auto p-6 bg-gradient-to-br from-blue-100 to-purple-200 rounded-xl shadow-lg">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
                Feedback and Ratings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {feedbackdata.map((feedback) => (
                    <div
                        key={feedback._id}
                        className="border border-gray-300 rounded-xl p-6 shadow-md bg-white transform hover:scale-105 transition duration-300 ease-in-out 
                   h-full flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center mb-3">
                                <span className="text-xl font-semibold text-gray-800">
                                    Rating: {feedback.rating}
                                </span>
                                <span className="ml-3 text-yellow-500 text-lg">
                                    {'⭐'.repeat(feedback.rating)}
                                </span>
                            </div>
                            <p className="text-gray-700 text-lg italic">"{feedback.comment}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
};

export default Feedback;