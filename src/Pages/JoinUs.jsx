import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authcontext } from '../Authprovider/Authprovider';
import { FaGoogle } from "react-icons/fa";
import { Helmet } from 'react-helmet';

const JoinUs = () => {
    const { user, setUser, signinuser, signinwithGoogle, setLoading } = useContext(authcontext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        signinuser(email, password)
            .then(result => {
                setUser(result.user);
                setLoading(false);
                toast.success('Logged in successfully');
                navigate('/');
            })
            .catch(() => {
                toast.error('Please enter a valid email and password');
            });
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signinwithGoogle();
            const { displayName: name, email, photoURL: photo } = result.user;
            const role = 'participant';
            const rdata = { name, email, role, photo };

            const response = await axios.post('https://medical-camp-server-nine.vercel.app/sign', rdata);

            if (response.status === 200 || response.status === 201) {
                setUser(result.user);
                setLoading(false);
                toast.success('Successfully logged in');
                navigate('/');
            } else {
                toast.error('Failed to save user data. Please try again.');
            }
        } catch (error) {
            console.error('Error during Google Sign-in:', error);
            toast.error('Google Sign-in failed. Please try again.');
        }
    };

    const handlePrefill = (role) => {
        if (role === 'participant') {
            setEmail('tasnimhossain153@gmail.com');
            setPassword('Denuryvai');
        } else if (role === 'organizer') {
            setEmail('denuryc@gmail.com');
            setPassword('Denuryvai');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Helmet>
                <title>Medical Camp Pro | Login</title>
                <meta name="description" content="Login page for Medical Camp Pro" />
            </Helmet>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login to Your Account</h2>

                <div className="flex gap-4 mb-4">
                    <button onClick={() => handlePrefill('participant')} className="w-1/2 bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition">
                        Participant Login
                    </button>
                    <button onClick={() => handlePrefill('organizer')} className="w-1/2 bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition">
                        Organizer Login
                    </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        name='email'
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                <button className='mt-4 w-full border border-gray-300 p-3 rounded-lg bg-blue-600 text-white flex justify-center items-center gap-2' onClick={handleGoogleSignIn}>
                    Sign in with Google <FaGoogle />
                </button>

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
