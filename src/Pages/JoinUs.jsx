import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authcontext } from '../Authprovider/Authprovider';
import axios from 'axios';
import { toast } from 'react-toastify';

const JoinUs = () => {
    const { user, setUser, signinuser, signinwithGoogle, setLoading } = useContext(authcontext);
    console.log(user);
    const navigate = useNavigate()
    const handlelogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        signinuser(email, password)
            .then(result => {
                setUser(result.user)
                setLoading(false)
                toast.success('Logged in succefully')
                navigate('/')
            })
            .catch(error => {
                // console.log(error.message);
                toast.error('Please Enter valid Email password')
            })
    }
    const handlegooglesignin = async () => {
        try {
            const result = await signinwithGoogle();
            const { displayName: name, email, photoURL: photo } = result.user;
            const role = 'participant';
            const rdata = { name, email, role, photo };

            // Sending user data to the database
            const response = await axios.post('http://localhost:5000/sign', rdata);

            if (response.status === 200 || response.status === 201) {
                setUser(result.user);
                setLoading(false);
                toast.success('Successfully logged in');
                navigate('/');
            } else {
                toast.error('Failed to save user data. Please try again.');
                return;
            }
        } catch (error) {
            console.error('Error during Google Sign-in:', error);
            toast.error('Google Sign-in failed. Please try again.');
            return;
        }
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login to Your Account</h2>

                <form onSubmit={handlelogin} className="space-y-4">
                    <input
                        type="email"
                        name='email'
                        placeholder="Email Address"
                        // value={email}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder="Password"
                        // value={password}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
                <div>
                    <button onClick={handlegooglesignin}>sing in google</button>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot Password?
                    </a>
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-600 hover:underline">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
