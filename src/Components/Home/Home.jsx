import React, { use } from 'react';
import Navbar from './Navbar';
import { Outlet, useNavigation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { Loading } from '../Provider/PrivateRoute';
import Footer from './Footer';

const Home = () => {

    const { loading,darkMode } = use(AuthContext)
    const navigation = useNavigation() ;
    const isNavigating = Boolean(navigation.location);

    if (loading)
        return <Loading />
    

    return (
        <div className={` ${darkMode ? 'dark' : ''} dark:bg-gray-900 dark:text-gray-200`}>
            <Navbar></Navbar>
            {isNavigating && <Loading />}
            <Outlet></Outlet>
            <Footer/>
        </div>
    );
};

export default Home;