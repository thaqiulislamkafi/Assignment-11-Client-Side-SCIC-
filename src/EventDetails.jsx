import React, { use, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Error from './Components/Error';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import CountDown from './Components/Dashboard/MainSide';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from './Components/Provider/AuthProvider';
import { Loading } from './Components/Provider/PrivateRoute';

const EventDetails = () => {

    // const event = useLoaderData()

    const { user,loading } = use(AuthContext)
    
    const [regiOpen, setRegiOpen] = useState(false)
    const [marathonloading, setMarathonloading] = useState(false);
    const [event, setEvent] = useState('') ;
    const {event_id } = useParams();
    // console.log(marathon_id)

    const now =  Date.now();
    // console.log(now) ;


    useEffect(() => {
        setMarathonloading(true)
        fetch(`https://assignment-11-server-site-silk-one.vercel.app/marathon/${event_id}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setEvent(data);
                setMarathonloading(false);

            })
            .catch(()=>{
                setMarathonloading(false);

            })

            
    }, [])


    useEffect(() => {

        const data = () => {
            setRegiOpen(now >= new Date(event.start_date) && now <= new Date(event.deadline_date))
        }
        data();
    }, [event])

    if(loading || marathonloading)
        return <Loading/> 

    const remainningTime = Math.floor((new Date(event.deadline_date) - now) / 1000)

    console.log(remainningTime)



    if (!event?.start_date) {
        return <Error />
    }


    

    const Marathon_Outlet = 'my-10 p-5 md:p-7 border-2 border-gray-200 rounded-xl flex flex-col md:flex-row md:items-center gap-8 font-medium';

    return (
        <div>
            <div>


                <Helmet>
                    <title>Event Details </title>
                </Helmet>

                <div className='w-[85.94vw] mx-auto sora-font my-12'>

                    {/* ..............Title Bar.............. */}

                    <div className='bg-gray-100 text-center py-16 rounded-xl px-4 lg:px-16 dark:bg-gray-700'>
                        <p className='text-3xl md:text-4xl my-3 poppins font-bold'>Marathon Details</p>
                        <p className='text-gray-800 my-2 text-xs md:text-sm dark:text-gray-200'>Explore everything you need to know about this exciting marathon! Get the full details on dates, venue, featured performers, and schedules. You can like a marathon multiple times as your wish which is count as a rating of a marathon. Marathon remaining Time :</p>

                        {/* <CountdownCircleTimer
                            isPlaying
                            duration={remainningTime}
                            colors="#A30000"
                            strokeWidth={3}
                            size={120}
                            
                        >
                            {() => (
                                <div style={{ fontSize: '13px', textAlign: 'center' }} role="timer" aria-live="assertive">
                                    {formatTime(remainningTime)}
                                </div>
                            )}
                        </CountdownCircleTimer> */}

                        <CountDown deadline_date={event.deadline_date} />
                    </div>

                    {/* ..............Recipe Bar.............. */}

                    <div className={Marathon_Outlet}>

                        <div className='bg-gray-200 lg:p-6 rounded-xl lg:w-[29.13vw] h-auto md:w-3/5'><img className='rounded-xl h-60 w-full' src={event.thumbnail} alt="" /></div>

                        <div className='text text-gray-700 dark:text-gray-200'>

                            <p className='text-[#176AE5] text-xs px-3 py-2 bg-[#1769e51c] rounded-2xl w-fit my-2 dark:text-gray-200'># {event.category} </p>

                            <p className='poppins my-2 text-xl lg:text-3xl font-bold'>{event.name}</p>
                            <p className='flex flex-col gap-2 my-2 text-sm lg:text-lg'>
                                <span>Location : {event.location}</span>
                                <span>Registration Deadline : {event.deadline_date
                                }</span>
                            </p>

                            <p className='font-medium my-2 text-sm lg:text-base'>Event Date : <span className='text-[#23BE0A] font-bold'>{event.
                                event_start}</span></p>
                            <p className='font-medium my-2 text-sm lg:text-base'>Total Registration : <span className='text-[#23BE0A] font-bold'>{event.count}</span></p>
                            <button className='btn btn-xs lg:btn-sm btn-outline rounded-4xl my-2' disabled={!regiOpen}><Link to={`/marathonRegistration/${event._id}`} className=''>Register</Link></button>


                        </div>
                    </div>

                    {/* ..............Event Details Bar.............. */}
                    {/* 
                    <div className='border-2 border-gray-200 rounded-xl p-7 text-center my-20 mb-40'>
                        <p className='poppins text-2xl my-3 font-bold'>Details</p>
                        <div className='border-t-2 border-dashed border-gray-200 my-4'></div>
                        <div className='text-start'>
                            <p className='font-medium'>{event.details}</p>

                        </div>
                        <div className='border-t-2  border-gray-100 my-4'></div>


                    </div>
                     */}
                </div>

            </div>
        </div>
    );
};

export default EventDetails;