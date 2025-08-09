import React, { use, useEffect, useState } from 'react';
import { Event } from './Home/Body';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from './Provider/AuthProvider';
import { Loading } from './Provider/PrivateRoute';

const Marathons = () => {

    const { user } = use(AuthContext);
    const [allevents, setAllevents] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true)

        fetch(`https://assignment-11-server-site-silk-one.vercel.app/allevents`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setAllevents(data);
                setLoading(false);

            })
    }, [])

    if (loading)
        return <Loading />

    return (
        <div>

            <Helmet>
                <title>Marathons</title>
            </Helmet>

            <div className='w-[85.94vw] mx-auto my-30'>
                <p className='text-4xl text-center poppins font-bold mt-10'>All Events</p>
                <p className='text-lg text-center poppins my-4 mb-16'>Explore a complete timeline of events, starting from the most recent ones. This page includes both upcoming and already held events to keep you informed and inspired.
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>

                    {
                        allevents?.map(event => <Event key={event._id} event={event}></Event>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Marathons;