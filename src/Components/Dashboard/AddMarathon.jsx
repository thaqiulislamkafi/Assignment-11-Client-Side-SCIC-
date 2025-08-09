import React, { use, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

export const euroToIso = (euroDate)=>{
    const [month,day,year] = euroDate.split('/') ;
    return `${year}-${month}-${day}`
}

const AddMarathon = () => {

    // const [date, setDate] = useState(new Date()) ;

    const [regiStart, setRegiStart] = useState(new Date());
    const [regiEnd, setRegiEnd] = useState(new Date());
    const [eventStart, setEventStart] = useState(new Date());


    const { user } = use(AuthContext);

    const handleAddMarathon = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const MarathonData = Object.fromEntries(formData.entries());

        MarathonData.count = 0;

        MarathonData.event_start = euroToIso(MarathonData.event_start);
        MarathonData.event_created = euroToIso(MarathonData.event_created)
        MarathonData.start_date = euroToIso(MarathonData.start_date)
        MarathonData.deadline_date = euroToIso(MarathonData.deadline_date)

        axios.post(`https://assignment-11-server-site-silk-one.vercel.app/newMarathon`, MarathonData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Successfully Added",
                        icon: "success"
                    });
                }

            })
    }

    return (


        <div>

            <Helmet>
                <title>Dashboard | Add Marathon</title>
            </Helmet>

            <div className='my-10 lg:mx-10'>
                <p className='text-center font-bold text-2xl'>Add Marathon</p>

                <form onSubmit={handleAddMarathon} className="fieldset  border-base-300 rounded-box  border p-4 gird grid-cols-1 md:grid-cols-2  gap-5 my-10">

                    <div className='flex flex-col gap-2'>
                        <label className="label">Event Name</label>
                        <input type="text" name='name' className="input w-full" placeholder="Enter Event Name" />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Location</label>
                        <input type="text" name='location' className="input  w-full" placeholder="Enter event Location" />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Registration Deadline</label>

                        <DatePicker name='deadline_date' className='input w-full' selected={regiEnd} onChange={(regiEnd) => setRegiEnd(regiEnd)}></DatePicker>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Select Category </label>
                        <select defaultValue="Pick a color" className="select w-full" name='category'>
                            <option disabled={true}>Pick a Category</option>
                            <option>Art</option>
                            <option>Environment</option>
                            <option>Food</option>
                            <option>Tech</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Registration Start Date</label>
                        <DatePicker name='start_date' className='input w-full' selected={regiStart} ></DatePicker>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Event Start</label>

                        <DatePicker name='event_start' className='input w-full' selected={eventStart} onChange={(eventStart) => setEventStart(eventStart)}></DatePicker>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Set Running Distance </label>
                        <select defaultValue="Pick a color" className="select w-full" name='running_distance'>
                            <option disabled={true}>Pick one</option>
                            <option>3k</option>
                            <option>10k</option>
                            <option>15k</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Details</label>
                        <input type="text" name='details' className="input  w-full" placeholder="Enter event Details" />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Registration Created</label>
                        <DatePicker name='event_created' className='input w-full' selected={regiStart} ></DatePicker>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Event User</label>
                        <input type="text" name='event_user' className="input  w-full" defaultValue={user.email} placeholder="Enter User email" />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <label className="label">Event Thumbnail</label>
                        <input type="text" name='thumbnail' className="input w-full " placeholder="Enter Event Thumbnail" />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className="label">Registration Count</label>
                        <input type="text" className="input  w-full" value='0' placeholder="" />
                    </div>

                    <button className='w-full btn md:col-span-2'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddMarathon;