import React, { use, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2';
import { euroToIso } from './AddMarathon';

const UpdateMarathon = ({ marathon,setMarathon }) => {

    const { user } = use(AuthContext);

    const [regiStart, setRegiStart] = useState(marathon.start_date);
    const [regiEnd, setRegiEnd] = useState(marathon.deadline_date);
    const [eventStart, setEventStart] = useState(marathon.event_start);


    const handleUpdateMarathon = (e) => {

        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const UpdatedMarathon = Object.fromEntries(formData.entries());

        UpdatedMarathon.count = marathon.count;

        UpdatedMarathon.event_start = euroToIso(UpdatedMarathon.event_start);
        UpdatedMarathon.event_created = euroToIso(UpdatedMarathon.event_created)
        UpdatedMarathon.start_date = euroToIso(UpdatedMarathon.start_date)
        UpdatedMarathon.deadline_date = euroToIso(UpdatedMarathon.deadline_date)

        setMarathon(UpdatedMarathon) ;
        axios.put(`https://assignment-11-server-site-silk-one.vercel.app/updatedMarathon/${marathon._id}`, UpdatedMarathon)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Your Marathon has been Updated.",
                        icon: "success"
                    });
                }
            })
            .catch(error => console.log(error))

    }

    return (
        <div>
            <div className='my-10 lg:mx-10 '>
                <p className='text-center font-bold text-2xl'>Update Marathon</p>

                <form onSubmit={handleUpdateMarathon} className="fieldset  border-base-300 rounded-box  border p-4 gird grid-cols-1 lg:grid-cols-2 gap-5 my-10">

                    <div className='flex flex-col gap-2'>
                        <label className="label">Event Name</label>
                        <input type="text" defaultValue={marathon.name} name='name' className="input w-full dark:bg-gray-900" placeholder="Enter Event Name" />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Location</label>
                        <input type="text" name='location' className="input dark:bg-gray-900 w-full" defaultValue={marathon.location} placeholder="Enter event Location" />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Registration Deadline</label>

                        <DatePicker name='deadline_date' className='input w-full dark:bg-gray-900' selected={regiEnd} onChange={(regiEnd) => setRegiEnd(regiEnd)}></DatePicker>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Select Category </label>
                        <select defaultValue="Pick a color" className="select w-full dark:bg-gray-900" name='category'>
                            <option disabled={true}>Pick a Category</option>
                            <option>Art</option>
                            <option>Environment</option>
                            <option>Food</option>
                            <option>Tech</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Registration Start Date</label>
                        <DatePicker name='start_date' className='input w-full dark:bg-gray-900' selected={regiStart} ></DatePicker>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Event Start</label>

                        <DatePicker name='event_start' className='input w-full dark:bg-gray-900' selected={eventStart} onChange={(eventStart) => setEventStart(eventStart)}></DatePicker>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Set Running Distance </label>
                        <select defaultValue="Pick a color" className="select w-full dark:bg-gray-900" name='running_distance'>
                            <option disabled={true}>Pick one</option>
                            <option>3k</option>
                            <option>10k</option>
                            <option>15k</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Details</label>
                        <input type="text" name='details' className="input dark:bg-gray-900 w-full" placeholder="Enter event Details" defaultValue={marathon.details} />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Registration Created</label>
                        <DatePicker name='event_created' className='input w-full dark:bg-gray-900' selected={regiStart} ></DatePicker>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Event User</label>
                        <input type="text" name='event_user' className="input dark:bg-gray-900 w-full" defaultValue={user.email} placeholder="Enter User email" />
                    </div>

                    <div className='flex flex-col gap-2 lg:col-span-2'>
                        <label className="label">Event Thumbnail</label>
                        <input type="text" name='thumbnail' className="input w-full dark:bg-gray-900" defaultValue={marathon.thumbnail} placeholder="Enter Event Thumbnail" />
                    </div>

                    <button className='w-full btn lg:col-span-2 dark:bg-gray-800 dark:text-gray-200'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateMarathon;