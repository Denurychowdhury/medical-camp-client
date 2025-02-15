import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase.config';
import { useQuery } from '@tanstack/react-query';


export const authcontext = createContext()
const Authprovider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // const [home, setHome] = useState(null)
    const [theme, setTheme] = useState(false)
    const provider = new GoogleAuthProvider();
    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signinuser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signinwithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const updateuserprofile = info => {
        setLoading(true)
        return updateProfile(auth.currentUser, info)
    }
    const logoutuser = () => {
        setLoading(true)
        return signOut(auth)
    }
    const userInfo = {
        user,
        setUser,
        registerUser,
        loading,
        setLoading,
        logoutuser,
        signinuser,
        signinwithGoogle,
        updateuserprofile,
        theme,
        setTheme,
        // home,
        // setHome
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentuser => {
            setUser(currentuser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    return (
        <authcontext.Provider value={userInfo}>
            {children}
        </authcontext.Provider>
    );
};

export default Authprovider;