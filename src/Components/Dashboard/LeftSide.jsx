import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { NavLink } from 'react-router';
import { MdOutlineEventRepeat } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";

const LeftSide = () => {

    const { user } = use(AuthContext)

    const NavButton = 'px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 poppins flex gap-3';

    return (
        <div className='w-full'>

            <p className='p-3'>DashBoard</p>

            <div className='flex items-center gap-3 p-3 my-2'>
                <div className='w-8 rounded-lg'><img className='rounded-lg' src={user?.photoURL} alt="" /></div>
                <div className='text-xs'>
                    <p>{user?.displayName}</p>
                    <p>{user?.email}</p>
                </div>
            </div>
            <div className="divider"></div>
            <p className='text-sm p-3'>Pages</p>
            <div className='dash-board w-full space-y-2'>
                <NavLink className={NavButton} to={'myMarathons'}>

                    <div><MdOutlineEventRepeat size={20} /></div>
                    <p >My Marathons</p>                
                    
                </NavLink>

                <NavLink className={NavButton} to={'addMarathon'}>

                    <div><MdAddToPhotos size={20} /></div>
                    <p >Add Marathon</p>                
                    
                </NavLink>

                <NavLink className={NavButton} to={'myapply'}>

                    <div><MdEventAvailable size={20} /></div>
                    <p >My Apply</p>                    
                    
                </NavLink>
            </div>
        </div>
    );
};

export default LeftSide;