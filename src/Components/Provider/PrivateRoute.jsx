import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user, loading } = use(AuthContext);

    if (user)
        return children;

    if (loading)
        return <Loading />

    return <Navigate to={'/signin'}></Navigate>;
};

export default PrivateRoute;

export const Loading = () => {

    return (
        <>

            <div className='min-h-screen flex justify-center items-center'>
                <span className="loading loading-spinner loading-xl "></span>
            </div>
        </>
    );
};