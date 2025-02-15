import React from 'react';

const Feedback = () => {
    return (
        <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="participantCount">
                Participant Count
            </label>
            <input
                type="number"
                id="participantCount"
                name="participantCount"
                value={0}
                readOnly
                className="w-full px-4 py-3 border border-blue-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
            />
        </div>

    );
};

export default Feedback;