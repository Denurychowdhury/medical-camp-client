import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { authcontext } from '../Authprovider/Authprovider';


const Privateroute = ({ children }) => {
    const { user, loading } = useContext(authcontext)
    console.log(user);
    // const location = useLocation()
    // console.log(location);
    const navigate = useNavigate()
    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if (user) {
        return children;
    }
    return (
        <Navigate to='/login'></Navigate>
    );
};

export default Privateroute;