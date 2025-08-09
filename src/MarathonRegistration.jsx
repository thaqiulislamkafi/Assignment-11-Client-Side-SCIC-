import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from './Components/Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Error from './Components/Error';
import { Loading } from './Components/Provider/PrivateRoute';

const MarathonRegistration = () => {

    const { user } = use(AuthContext)
    const [loading, setLoading] = useState(false);
    const [marathon, setMarathon] = useState('');

    const { marathon_id } = useParams();
    const [count, setCount] = useState(marathon.count)

    useEffect(() => {
        setLoading(true)

        fetch(`https://assignment-11-server-site-silk-one.vercel.app/marathon/${marathon_id}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setMarathon(data);
                setLoading(false);

            })
            .catch(()=>{
                setLoading(false);

            })
    }, [])


    if (loading)
        return <Loading />

    if (!marathon.start_date) {
        return <Error />
    }
    const handleRegistration = (e) => {

        setCount(count + 1);
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const regiForm = Object.fromEntries(formData.entries());
        regiForm.marathonId = marathon._id;
        regiForm.event_user = user.email;
        console.log(regiForm);

        axios.post('https://assignment-11-server-site-silk-one.vercel.app/registration', regiForm)
            .then(res => {
                console.log(res)
                if (res.data._id) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Successfully Registered",
                        icon: "success"
                    });
                }
            })
            .catch(error => console.log(error))


        console.log(count);

        axios.patch(`https://assignment-11-server-site-silk-one.vercel.app/updateCount/${marathon._id}`, { count: count + 1 })
            .then((res) => {
                console.log(res)
            })
            .catch(error => {
                console.log('Error in Updating Count Number', error)
            })
    }

    return (
        <div>

            <Helmet>
                <title>Marathon Registration</title>
            </Helmet>

            <div className='w-[85.94vw] mx-auto sora-font flex justify-center'>

                <form onSubmit={handleRegistration} className="fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4 my-12 lg:px-10">

                    <p className='text-xl lg:text-2xl font-bold my-8 text-gray-800 text-center'> Registration</p>

                    <div className='flex flex-col gap-2 my-1'>
                        <label className="label">Marathon Title</label>
                        <input type="text" className="input w-full rounded-3xl" name='name' value={marathon.name} placeholder="" />
                    </div>

                    <div className='flex flex-col gap-2 my-1'>
                        <label className="label">Start Date</label>
                        <input type="text" className="input w-full rounded-3xl" name='event_start' placeholder="" value={marathon.event_start} />
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 w-full '>
                        <div className='flex flex-col gap-2 my-1'>
                            <label className="label">First Name</label>
                            <input type="text" className="input w-full rounded-3xl" name='first_name' placeholder="First Name" />
                        </div>

                        <div className='flex flex-col gap-2 my-1'>
                            <label className="label">Last Name</label>
                            <input type="text" className="input w-full rounded-3xl" name='last_name' placeholder="Last Name" />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 w-full '>
                        <div className='flex flex-col gap-2 my-1'>
                            <label className="label">Your Github Profile Link</label>
                            <input type="text" className="input w-full rounded-3xl" name='git_link' placeholder="Github Profile Link" />
                        </div>

                        <div className='flex flex-col gap-2 my-1'>
                            <label className="label">Your Contact No</label>
                            <input type="number" className="input w-full rounded-3xl" name='contact' placeholder="Contact" />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 my-1'>
                            <label className="label">Your Email</label>
                            <input type="email" className="input w-full rounded-3xl" value={user.email}  placeholder="Email" />
                        </div>

                    <button className='btn rounded-3xl my-4 btn-outline w-full'>Registration</button>
                </form>
            </div>
        </div>
    );
};

export default MarathonRegistration;