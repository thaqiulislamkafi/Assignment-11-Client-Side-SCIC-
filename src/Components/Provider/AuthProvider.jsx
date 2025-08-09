import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/authentication';

export const AuthContext = createContext();
import axios from 'axios';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null) ;
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        const unSubcribe = onAuthStateChanged(auth, (user)=> {
            setUser(user) ;
            setLoading(false);
            console.log("barbar print");

            if(user?.email){
                axios.post('https://assignment-11-server-site-silk-one.vercel.app/jwt', {email : user.email},{withCredentials : true})
                .then(res=> console.log(res.data))
                .catch(error => console.log(error))
            }
        })

        return unSubcribe ;
    },[user])

    const AuthData = {
        user,
        setUser,
        loading,
        setLoading
    }

    return <AuthContext value={AuthData}>{children}</AuthContext>
};

export default AuthProvider;