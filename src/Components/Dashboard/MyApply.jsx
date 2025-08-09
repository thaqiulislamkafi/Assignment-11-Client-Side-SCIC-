import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2';
import axios from 'axios';
import UpdateApply from './UpdateApply';
import { Helmet } from 'react-helmet-async';
import { Loading } from '../Provider/PrivateRoute';

const MyApply = () => {

    const { user } = use(AuthContext);
    const [marathons, setMarathons] = useState(null);
    const [search, setSearch] = useState(null);

    

    useEffect(() => {
       
        fetch(`https://assignment-11-server-site-silk-one.vercel.app/myapply?email=${user?.email}&search=${search}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setMarathons(data) ;
                
            })
    }, [search])

    // console.log(search)

   
    return (
        <div>

            <Helmet>
                <title>Dashboard | My Apply</title>
            </Helmet>

            <div className='my-10'>
                <p className='text-center text-2xl font-bold my-3'>My Apply</p>

                <div className='text-center my-5'>
                    <input type="text" placeholder="Search By Title" className="input " onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
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
                                marathons?.map((marathon, index) => <MyMarathon index={index} marathon={marathon} marathons={marathons} setMarathons={setMarathons} ></MyMarathon>)
                            }


                        </tbody>
                    </table>

                    {
                    (marathons?.length === 0) && <p className='text-center text-xl my-10 text-gray-800 font-semibold'>
                        No Marathons Applied By You
                    </p>
                }
                </div>
            </div>
        </div>
    );
};

export default MyApply;

const MyMarathon = ({ index, marathon, marathons, setMarathons }) => {


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

                axios.delete(`https://assignment-11-server-site-silk-one.vercel.app/myapply/${marathon._id}`)
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

                axios.patch(`https://assignment-11-server-site-silk-one.vercel.app/marathon/${marathon.marathonId}`, {
                    count: marathon.count - 1
                })
                    .then(res => {
                        console.log(res);
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
            <dialog id={marathon._id} className="modal">
                <div className="modal-box lg:max-w-3/7">
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn rounded-full p-3 "><RxCross2 /></button>
                        </form>
                    </div>
                    <UpdateApply marathon={marathon}></UpdateApply>

                </div>
            </dialog>
        </>
    );
};