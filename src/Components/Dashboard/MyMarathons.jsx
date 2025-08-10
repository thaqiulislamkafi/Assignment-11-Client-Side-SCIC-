import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import UpdateMarathon from './UpdateMarathon';
import { RxCross2 } from "react-icons/rx";
import { Helmet } from 'react-helmet-async';
import { Loading } from '../Provider/PrivateRoute';


const MyMarathons = () => {

    const { user } = use(AuthContext);
    const [loading, setLoading] = useState(false);
    const [marathons, setMarathons] = useState();

    useEffect(() => {
        setLoading(true)
        fetch(`https://assignment-11-server-site-silk-one.vercel.app/postedEvents?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setMarathons(data);
                setLoading(false);
            })


    }, [])

    if (loading)
        return <Loading />



    return (
        <div>
            <Helmet>
                <title>Dashboard | My Marathons</title>
            </Helmet>

            <div className='my-10'>
                <p className='text-center text-2xl font-bold my-3'>My Marathons</p>
               

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='dark:text-gray-200'>
                            <tr>
                                <th></th>
                                <th>Marathon Name</th>
                                <th>Location</th>
                                <th>Deadline</th>
                                <th>Edit/View</th>
                            </tr>
                        </thead>

                        
                        <tbody>
                            {/* row 1 */}

                            {
                                marathons?.map((marathon, index) => <Marathon index={index} ShowMarathon={marathon} marathons={marathons} setMarathons={setMarathons} ></Marathon>)
                            }



                        </tbody>
                    </table>

                    {
                    (marathons?.length === 0) && <p className='text-center text-xl my-10 text-gray-800 font-semibold'>
                        No Marathons Created By You
                    </p>
                }
                </div>
            </div>
        </div>
    );
};

export default MyMarathons;

const Marathon = ({ index, ShowMarathon, marathons, setMarathons }) => {

    const [marathon, setMarathon] = useState(ShowMarathon);

    const handleDelete = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`https://assignment-11-server-site-silk-one.vercel.app/marathon/${marathon._id}`)
                    .then(res => {

                        const newMarathons = marathons.filter(data => data._id != marathon._id);
                        setMarathons(newMarathons);

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });

                    })
                    .catch(error => console.log(error))



            }
        });


    }

    return (
        <>
            <tr>
                <th>{index + 1}</th>
                <td>{marathon?.name}</td>
                <td>{marathon?.location}</td>
                <td>{marathon?.deadline_date}</td>
                <td className='flex gap-2'>

                    <button className='btn btn-xs' onClick={() => document.getElementById(`${marathon._id}`).showModal()}><MdEdit /></button>

                    <button onClick={handleDelete} className='btn btn-xs'><AiFillDelete /></button>
                </td>
            </tr>

            <dialog id={marathon._id} className="modal dark:bg-gray-900">
                <div className="modal-box lg:max-w-2/3 dark:bg-gray-900">
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn rounded-full p-3 "><RxCross2 /></button>
                        </form>
                    </div>
                    <UpdateMarathon marathon={marathon} setMarathon={setMarathon}></UpdateMarathon>

                </div>
            </dialog>


        </>
    );
};