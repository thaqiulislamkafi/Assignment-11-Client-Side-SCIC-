import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/authentication';
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user } = use(AuthContext);
    console.log(user)

    const blackLogo = 'https://i.postimg.cc/rprF9z6y/vecteezy-letter-e-elegant-golden-ratio-modern-monogram-logo-22188510.png';

    const handleSignOut = () => {

        signOut(auth)
            .then(() => {
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully Signed Out",
                    icon: "success"
                });
            })
    }

    return (
        <div className='bg-base-100 shadow-sm'>
            <div className="navbar Navbar-three-colomn sora-font w-[85.94vw] mx-auto ">
                <div className="flex ">
                    <div className="lg:hidden  ">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="btn  btn-ghost btn-circle ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                            </label>

                        </div>
                        <div className=" drawer-side z-50 ">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay "></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 max-w-1/2">
                                {/* Sidebar content here */}
                                <li><NavLink to={'/'}>Home</NavLink></li>
                                <li><NavLink to={'/marathons'}>Marathons</NavLink> </li>
                                <li><NavLink to={'/dashboard/myMarathons'}>Dashboard</NavLink></li>
                            </ul>
                        </div>
                    </div>

                    <div className='logo flex items-center gap-1  mx-0'>
                        <img className='w-7' src={blackLogo} alt="" />
                        <p className='text-xl poppins'>
                            <span className='font-bold'>Eventure</span>
                        </p>
                    </div>

                </div>

                <div className='flex items-center gap-12'>

                    <div className="  hidden lg:flex items-end">
                        <ul className="Nav-mid  menu-horizontal px-1">
                            <li><NavLink to={'/'}>Home</NavLink></li>
                            <li><NavLink to={'/marathons'}>Marathons</NavLink> </li>
                            {
                                user && 
                                <li><NavLink to={'/dashboard/myMarathons'}>Dashboard</NavLink></li>
                            }
                           
                        </ul>
                    </div>

                    {
                        user ? <div className="flex items-center gap-3">

                            <div className='bg-gray-100 rounded-full p-1 tooltip tooltip-left' data-tip={user.displayName}>
                                <img className='rounded-full max-w-8' src={user.photoURL} alt="" />
                            </div>
                            <Link onClick={handleSignOut} className="btn btn-sm px-4 rounded-3xl ">Sign Out</Link>
                        </div>

                            :

                            <div className="flex items-center gap-5">
                                <Link to={'/signin'} className="btn btn-sm px-4 rounded-3xl">Sign In</Link>
                                <Link to={'/signup'} className="btn btn-sm px-4 rounded-3xl md:flex hidden">Register</Link>
                            </div>
                    }

                </div>

            </div>
        </div>
    );
};

export default Navbar;