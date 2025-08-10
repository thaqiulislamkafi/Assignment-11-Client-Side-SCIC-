import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/authentication';
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user ,darkMode, setDarkMode } = use(AuthContext);
    console.log(user)

    const blackLogo = 'https://i.postimg.cc/rprF9z6y/vecteezy-letter-e-elegant-golden-ratio-modern-monogram-logo-22188510.png';
    const whiteLogo = 'https://i.postimg.cc/0yDJrn8Z/Eventure-footer-logo.png';

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

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        console.log(darkMode);
    }

    return (
        <div className='shadow-sm z-50 bg-white/30 dark:bg-gray-900/30 lg:sticky lg:top-0 backdrop-blur-lg '>
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
                        <img className='w-7' src={darkMode ? whiteLogo : blackLogo} alt="" />
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
                            <li><NavLink to={'/dashboard/myMarathons'}>Dashboard</NavLink></li>
                          
                           
                        </ul>
                    </div>

                    <div>
                        <label className="flex cursor-pointer gap-2 hidden md:flex">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <path
                                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                            </svg>
                            <input type="checkbox" value="synthwave" className="toggle theme-controller " onClick={handleDarkMode} />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </label>
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