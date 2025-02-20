import React from 'react';

const Errorpage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
            <h1 className="text-6xl font-bold text-blue-600">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mt-4">Oops! Page Not Found</h2>
            <p className="text-gray-600 mt-2">The page you're looking for doesn't exist or has been moved.</p>
            <img src="https://i.imgur.com/qIufhof.png" alt="Error" className="w-64 mt-6" />
            <Link to="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300">
                Go Back Home
            </Link>
        </div>
    );
};

export default Errorpage;