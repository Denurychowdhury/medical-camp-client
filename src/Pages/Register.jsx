import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authcontext } from '../Authprovider/Authprovider';
import { FaGoogle } from "react-icons/fa";
import { Helmet } from 'react-helmet';

const Register = () => {
    const { user, setUser, registerUser, setLoading, updateuserprofile, signinwithGoogle } = useContext(authcontext)
    console.log(user);
    const navigate = useNavigate()
    const handleUserRegister = e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        // console.log(name, email, photo, password);
        if (name.length == 0 || email.length == 0 || photo.length == 0 || password.length == 0) {
            toast.error('please fillup all field!')
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error('Please Enter Minimum one uppercase')
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error('Please enter One Lowecase')
            return;
        }
        if (!/^.{6,}$/.test(password)) {
            toast.error('Please enter Minimum 6 caracter')
            return;
        }
        const info = {
            displayName: name,
            photoURL: photo,
        }
        registerUser(email, password)
            .then(result => {
                console.log(result.user);
                setUser(result.user)
                setLoading(false)
                updateuserprofile(info)
                    .then((result) => {
                        setUser((prevUser) => {
                            return {
                                ...prevUser, info
                            }
                        })
                    }
                    )
                setLoading(false)
                const role = 'participent';
                const rdata = { name, email, role, photo }
                axios.post('https://medical-camp-server-nine.vercel.app/sign', rdata)
                    .then(data => {
                        console.log(data.data);
                    })
                toast.success('register succefully')
                navigate('/')
            })

    }
    const handlegooglesignin = async () => {
        try {
            const result = await signinwithGoogle();
            const { displayName: name, email, photoURL: photo } = result.user;
            const role = 'participant';
            const rdata = { name, email, role, photo };

            // Sending user data to the database
            const response = await axios.post('https://medical-camp-server-nine.vercel.app/sign', rdata);

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
            <div>
                <Helmet>
                    <title>Medical camp pro/register</title>
                    <meta name="description" content="Nested component" />
                </Helmet>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create an Account</h2>

                <form onSubmit={handleUserRegister} className="space-y-4">
                    <input
                        type="text"
                        name='name'
                        placeholder="Full Name"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name='photo'
                        placeholder="Upload your photo"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="email"
                        name='email'
                        placeholder="Email Address"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <button
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>

                <div>
                    <button onClick={handlegooglesignin} className='cursor-pointer mt-2 border border-gray-300 p-2 rounded-lg bg-blue-600 text-white flex items-center gap-2'>Sign in google <FaGoogle /></button>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:underline cursor-pointer">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
