import React, { use } from 'react';
import LeftSide from './LeftSide';
import { NavLink, Outlet, useNavigation } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../Provider/AuthProvider';
import { Loading } from '../Provider/PrivateRoute';



const Dashboard = () => {

    const { loading } = use(AuthContext)
    const navigation = useNavigation() ;
    const isNavigating = Boolean(navigation.location);

    if (loading)
        return <Loading />

    return (
        <div>

            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            
            <div className='sora-font w-[85.94vw] mx-auto lg:grid grid-cols-1 lg:grid-cols-12 gap-5 my-8 '>
                <aside className='col-span-3 bg-gray-50 dark:bg-gray-900 dark:border dark:border-gray-700 rounded-2xl h-fit  hidden lg:flex'>
                    <LeftSide />
                </aside>

                <div className="breadcrumbs flex justify-center max-w-full text-sm lg:hidden my-4">
                    <ul className=''>
                        <li> <NavLink to={'myMarathons'}>My Marathon</NavLink> </li>
                        <li> <NavLink to={'addMarathon'}>Add Marathon</NavLink> </li>
                        <li> <NavLink to={'myapply'}>My Apply List</NavLink> </li>
                        
                    </ul>
                </div>

                <aside className='col-span-9 bg-gray-50 rounded-2xl overflow-x-auto dark:bg-gray-900 dark:border dark:border-gray-700'>
                {isNavigating && <Loading />}
                    <Outlet></Outlet>
                </aside>
            </div>
        </div>
    );
};

export default Dashboard;