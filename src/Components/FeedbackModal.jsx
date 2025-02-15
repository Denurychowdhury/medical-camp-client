import React, { useState } from "react";
import useAxiosPublic from "../Hooks/useAxiospublic";

const FeedbackModal = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const axiospublic = useAxiosPublic()
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log("Rating:", rating);
        console.log("Comment:", comment);
        // You can add your logic to send this data to a server or handle it in some other way.
        const feedback = { rating, comment }
        axiospublic.post('/feedbacks', feedback)
            .then(res => {
                console.log(res.data);
            })
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Submit Feedback</h2>
                <p className="text-gray-600 text-sm mb-4 text-center">
                    Your feedback helps us improve our services.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Rating</label>
                        <select
                            name="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Rating</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Feedback</label>
                        <textarea
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            rows="4"
                            placeholder="Write your feedback here..."
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackModal;
