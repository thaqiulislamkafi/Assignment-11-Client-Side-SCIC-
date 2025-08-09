import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const UpdateApply = ({ marathon }) => {

    const UpdateRegistration = (e) => {

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const UpdatedForm = Object.fromEntries(formData.entries());
        console.log(UpdatedForm)


        axios.patch(`https://assignment-11-server-site-silk-one.vercel.app/updateApply/${marathon._id}`, UpdatedForm)
            .then(res => {
                console.log(res)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Your Apply has been Updated.",
                        icon: "success"
                    });
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className='sora-font'>

                <form onSubmit={UpdateRegistration} className="fieldset  border-base-300 rounded-box lg:w-lg border p-4 my-12 lg:px-10">

                    <p className='text-xl lg:text-2xl font-bold my-8 text-gray-800 text-center'>Update Registration</p>

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
                            <input type="text" className="input w-full rounded-3xl" name='first_name' defaultValue={marathon.first_name} placeholder="First Name" />
                        </div>

                        <div className='flex flex-col gap-2 my-1'>
                            <label className="label">Last Name</label>
                            <input type="text" className="input w-full rounded-3xl" defaultValue={marathon.last_name} name='last_name' placeholder="Last Name" />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 w-full'>
                        <div className='flex flex-col gap-2 my-1'>
                            <label className="label">Your Github Profile Link</label>
                            <input type="text" className="input w-full rounded-3xl" name='git_link' defaultValue={marathon.git_link} placeholder="Github Profile Link" />
                        </div>

                        <div className='flex flex-col gap-2 my-1'>
                            <label className="label">Your Contact</label>
                            <input type="number" className="input w-full rounded-3xl" name='contact' defaultValue={marathon.contact} placeholder="Your Contact" />
                        </div>

                        <div className='flex flex-col gap-2 my-1 lg:col-span-2'>
                            <label className="label">Your Email</label>
                            <input type="email" className="input w-full rounded-3xl" value={marathon.event_user} placeholder="Email" />
                        </div>


                    </div>

                    <button className='btn rounded-3xl my-4 btn-outline w-full'>Update</button>
                </form>
            </div>
        </div>

    );
};

export default UpdateApply;