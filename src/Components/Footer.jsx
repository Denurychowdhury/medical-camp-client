import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-800 text-white py-8 mt-12">
            <div className="max-w-screen-xl mx-auto px-6">
                <div className="flex flex-wrap justify-between mb-8">
                    <div className="w-full md:w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Medical Camp Management</h3>
                        <p className="text-sm text-gray-300">
                            A comprehensive platform for managing medical camps, improving access to healthcare, and connecting participants with medical professionals.
                        </p>
                    </div>

                    <div className="w-full md:w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-gray-300 hover:text-white">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/available-camps" className="text-gray-300 hover:text-white">
                                    Available Camps
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-gray-300 hover:text-white">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-300 hover:text-white">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li>
                                <p className="text-gray-300">Email: support@medicalcamp.com</p>
                            </li>
                            <li>
                                <p className="text-gray-300">Phone: +1 800-123-4567</p>
                            </li>
                            <li>
                                <p className="text-gray-300">Address: 123 Health St., City, Country</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-4 mt-8 text-center">
                    <p className="text-sm text-gray-300">&copy; 2025 Medical Camp Management. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
