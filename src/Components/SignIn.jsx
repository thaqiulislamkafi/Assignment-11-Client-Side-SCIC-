import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from './Firebase/authentication';
import Swal from 'sweetalert2';
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from 'react-router';

const SignIn = () => {

    const photoURL = "https://i.postimg.cc/rprF9z6y/vecteezy-letter-e-elegant-golden-ratio-modern-monogram-logo-22188510.png";

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const navigate = useNavigate() ;
    const location = useLocation() ;

    console.log(location)

    const handleSigninWithEmail = (e) => {

        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully Signed In",
                    icon: "success"
                });

                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch(error =>console.log(error))
    }

    const handleGithubSignIn = () => {

        signInWithPopup(auth, githubProvider)
            .then((res) => {
                console.log(res);
                updateProfile(auth.currentUser,{
                    displayName : auth.currentUser.providerData[0].displayName
                })
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully Signed In",
                    icon: "success"
                });

                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch(error => console.log(error))
    }

    const handleGoogleSignIn = () => {

        signInWithPopup(auth, googleProvider)
            .then((res) => {
                console.log(res.user);
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully Signed In",
                    icon: "success"
                });

                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className='flex flex-col lg:flex-row items-center justify-between sora-font w-[85.94vw] mx-auto min-h-screen px-4 my-20'>
                <div className='lg:w-3/6 text-center my-12'>
                    <div className='logo flex items-center gap-1 justify-center lg:justify-start'>
                        <img className='w-12 lg:w-25' src={photoURL} alt="" />
                        <p className='text-4xl lg:text-6xl poppins'>
                            <span className='font-bold'>Eventure</span>
                        </p>
                    </div>
                    <h1 className="text-lg lg:text-2xl font-medium sora-font my-5 lg:text-start">Eventure helps you connect and share event with the people in your life</h1>
                </div>

                <div className='space-y-8.5 lg:w-2/6'>
                    <p className='poppins font-bold text-4xl text-center'>Join Today</p>

                    <button onClick={handleGoogleSignIn} className='btn  w-full rounded-4xl '> <FcGoogle size={17} />Sign in with Google</button>

                    <button onClick={handleGithubSignIn} className='btn  w-full rounded-4xl '><SiGithub size={17} /> Sign in with Github</button>

                    <div className="divider">OR</div>

                    <button onClick={() => document.getElementById('my_modal_1').showModal()} className='btn w-full rounded-4xl mt-4 btn-info text-white'><HiOutlineMail size={20} color='white' /> Sign in with Email</button>

                    <div>
                        <p className='mt-6 my-3 text-center'>Don't Have an account?</p>
                        <Link to={'/signup'} className='btn w-full rounded-4xl btn-outline btn-info '>Create an Account</Link>
                    </div>
                </div>

                {/* Open the modal using document.getElementById('ID').showModal() method */}

                <dialog id="my_modal_1" className="modal ">
                    <div className="modal-box lg:max-w-1/3 pb-14">
                        <div className="modal-action mt-0">
                            <form className='flex text-start' method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-circle"><RxCross1 /></button>
                            </form>
                        </div>

                        <h3 className="font-bold text-xl text-center my-4 ">Log in</h3>

                        <form onSubmit={handleSigninWithEmail} className="fieldset space-y-1 rounded-box  p-4 ">

                            <div className='space-y-2'>
                                <label className="label">Email</label>
                                <input type="email" className="input w-full rounded-4xl" name='email' placeholder="Email" />
                            </div>

                            <div className='space-y-2'>
                                <label className="label">Password</label>
                                <input type="password" className="input w-full rounded-4xl" name='password' placeholder="Password" />
                            </div>

                            <button className="btn btn-neutral mt-4 w-full rounded-4xl">Login</button>
                        </form>

                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default SignIn;