import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const UpcomingEvent = () => {

    const [eventDatas, setEventDatas] = useState(null);

    useEffect(() => {
        fetch('https://assignment-11-server-site-silk-one.vercel.app/upcomingEvents')
            .then(res => res.json())
            .then(data => setEventDatas(data))
    }, [])

    console.log(eventDatas);
    return (
        <div className='w-[85.94vw] mx-auto my-30'>
            <p className='text-3xl text-start poppins font-semibold mt-10'>Upcoming Events</p>
            <p className='lg:text-lg text-start poppins text-gray-800 mt-3 mb-10 '>Discover the most exciting events happening soon in your town
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>

                {
                    eventDatas?.map(event => <ComingEvent key={event._id} event={event}></ComingEvent>)
                }
            </div>
        </div>
    );
};

export default UpcomingEvent;

const ComingEvent = ({ event }) => {

    return (
        <>

            <div className=' shadow-sm p-5 flex flex-col gap-6 rounded-xl sora-font dark:border dark:border-gray-700'>
                <div className='bg-gray-100 lg:p-4 rounded-xl w-full h-auto'><img className='rounded-xl h-48 w-full' src={event.thumbnail} alt="" /></div>
                <div className='text-start'>
                    <div className='flex gap-3 font-medium'>
                        <p className='text-[#23BE0A] text-xs px-3 py-2 bg-[#22be0a1e] rounded-2xl'># Available </p>
                        <p className='text-[#176AE5] text-xs px-3 py-2 bg-[#1769e51c] rounded-2xl'># {event.category}</p>
                    </div>
                    <p className='font-bold my-2 text-xl'>{event.name}</p>
                   
                    <div className='flex  items-center justify-between'>
                        <p className='text-gray-700 dark:text-gray-200 my-1 text-sm font-medium'> Event Start  : {event.event_start}</p>
                        {/* <p className='text-gray-700 my-1 text-sm font-medium'>Event Date : {event.event_start}</p> */}
                    </div>
                    <p className='text-gray-700 dark:text-gray-200 my-1 text-sm '> Registration End : <span className='text-[#23BE0A] font-bold'>{event.deadline_date}</span></p>
                    <p className='text-sm'>Details: {event.details.split(' ').slice(0,8).join(' ')}..</p>
                    <div>
                        <Link to={`/eventdetails/${event._id}`}>
                            <button className='btn rounded-4xl  my-2 btn-sm'>View more</button>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
}