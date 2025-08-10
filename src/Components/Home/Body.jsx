import React, { use } from 'react';
import Banner from './Banner';
import { Link, useLoaderData } from 'react-router';
import UpcomingEvent from './UpcomingEvent';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Body = () => {

    const events = useLoaderData();

    return (
        <div>
          <Helmet>
            <title>Home</title>
          </Helmet>

            <Banner />
            <div className='w-[85.94vw] mx-auto my-30'>
                <p className='text-4xl text-center poppins font-bold my-10'>Events</p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>

                    {
                        events.map(event => <Event key={event._id} event={event}></Event>)
                    }
                </div>
            </div>
            <UpcomingEvent/>
            <EventFAQSection/>
            <NewsletterSubscribe/>
        </div>
    );
};

export default Body;

export const Event = ({ event }) => {

  // console.log(event) ;
    return (
        <>
            <div className=''>
                <div className=' shadow-sm p-5 flex flex-col gap-6 rounded-xl sora-font dark:border dark:border-gray-700 '>
                    <div className='bg-gray-100 lg:p-4 rounded-xl w-full h-auto'><img className='rounded-xl h-48 w-full' src={event.thumbnail} alt="" /></div>

                    <div className='text-start'>

                        <div className='flex gap-3 font-medium'>
                            <p className='text-[#23BE0A] text-xs px-3 py-2 bg-[#22be0a1e] rounded-2xl'># Available </p>
                            <p className='text-[#176AE5] text-xs px-3 py-2 bg-[#1769e51c] rounded-2xl'># {event.category}</p>
                        </div>
                        
                        <p className='font-bold my-2 text-xl'>{event.name}</p>
                        <p className='text-gray-700 dark:text-gray-200 my-1 text-sm'>Location : {event.location}</p>
                        <div className='flex  items-center justify-between'>
                            <p className='text-gray-700 dark:text-gray-200 my-1 text-sm font-medium'> Registration Start  : {event.start_date}</p>
                            {/* <p className='text-gray-700 my-1 text-sm font-medium'> Date : {event.date}</p> */}
                        </div>
                        <p className='text-gray-700 dark:text-gray-200 my-1 text-sm '> Registration End : <span className='text-[#23BE0A] font-bold'>{event.deadline_date}</span></p>
                      

                        <div>
                            <Link to={`/eventdetails/${event._id}`}>
                                <button className='btn rounded-4xl  my-2 btn-sm'>View more</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

const EventFAQSection = () => {
    return (
      <section className="py-[70px] lg:py-[80px] w-[85.94vw] mx-auto lg:mb-28 sora-font">
        <p className="text-2xl font-semibold lg:text-3xl text-accentcolor mb-8">
          Frequently Asked Questions
        </p>
        <div className="asked bg-base-200 dark:bg-gray-900 dark:border dark:border-gray-700 rounded-2xl lg:px-14 lg:py-20">
          <div className="asked-container flex gap-6 flex-col p-3 lg:p-0 lg:flex-row lg:justify-between ">
            <div className="asked-title p-5 lg:ml-6">
              <img
                className="w-[250px] mx-auto lg:w-[350px]"
                src="https://i.postimg.cc/W4qy6W7k/Frame.png"
                alt="Event tracking illustration"
              />
            </div>
            <div className="asked-accordion space-y-2 lg:space-y-5 lg:max-w-[600px] ">
              {/* FAQ Item 1 */}
              <div className="collapse collapse-arrow bg-base-100 border-2 border-gray-100 dark:bg-gray-900 dark:border-gray-700">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-sm lg:text-lg font-medium">
                  How do I track local events in my area?
                </div>
                <div className="collapse-content text-xs lg:text-sm">
                  <p>
                    Our platform automatically detects and displays events based on your location. You can also search by event type, date, or venue. Enable location services for the most accurate local event recommendations.
                  </p>
                </div>
              </div>
  
              {/* FAQ Item 2 */}
              <div className="collapse collapse-arrow bg-base-100 border-2 border-gray-100 dark:bg-gray-900 dark:border-gray-700">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-sm lg:text-lg font-medium">
                  Can I submit my own event to be tracked?
                </div>
                <div className="collapse-content text-xs lg:text-sm">
                  <p>
                    Yes! We encourage community event submissions. Click on "Add Event" in the navigation menu and fill out the event details. Our team will review and approve it within 24 hours.
                  </p>
                </div>
              </div>
  
              {/* FAQ Item 3 */}
              <div className="collapse collapse-arrow bg-base-100 border-2 border-gray-100 dark:bg-gray-900 dark:border-gray-700">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-sm lg:text-lg font-medium">
                  How often is event information updated?
                </div>
                <div className="collapse-content text-xs lg:text-sm">
                  <p>
                    Our system updates event information in real-time. We pull data from official sources every 15 minutes and immediately reflect any changes submitted by event organizers.
                  </p>
                </div>
              </div>
  
              {/* FAQ Item 4 */}
              <div className="collapse collapse-arrow bg-base-100 border-2 border-gray-100 dark:bg-gray-900 dark:border-gray-700">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-sm lg:text-lg font-medium">
                  Is there a mobile app for event tracking?
                </div>
                <div className="collapse-content text-xs lg:text-sm">
                  <p>
                    Currently we offer a mobile-optimized website, with an iOS and Android app coming soon. You can save the website to your home screen for app-like functionality.
                  </p>
                </div>
              </div>
  
              {/* FAQ Item 5 */}
              <div className="collapse collapse-arrow bg-base-100 border-2 border-gray-100 dark:bg-gray-900 dark:border-gray-700">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-sm lg:text-lg font-medium">
                  How do I get notifications for new events?
                </div>
                <div className="collapse-content text-xs lg:text-sm">
                  <p>
                    After creating an account, you can customize notification preferences in your profile settings. Choose to receive alerts by email, browser notifications, or both.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const NewsletterSubscribe = () => {

    const {darkMode} = use(AuthContext) ;

    const handleSend = ()=>{

      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
    }

    const blackLogo = 'https://i.postimg.cc/rprF9z6y/vecteezy-letter-e-elegant-golden-ratio-modern-monogram-logo-22188510.png';
    const whiteLogo = 'https://i.postimg.cc/0yDJrn8Z/Eventure-footer-logo.png';

    return (
      <section className="">
        <div
          className="z-40 mailbox w-[85.94vw] mx-auto bg-gray-200 rounded-3xl px-7 py-10 lg:py-12 lg:px-20 flex flex-col lg:flex-row gap-5 justify-between items-center lg:-mb-48 -mb-64 relative sora-font dark:bg-gray-900 dark:border dark:border-gray-700"
        >
          <div className="image">
            <img
              className="w-[220px] lg:w-[330px] h-auto"
              src={darkMode ? whiteLogo : blackLogo}
              alt="Vegetable basket"
            />
          </div>
          <div className="description text-center lg:text-left">
            <h2 className="font-bold lg:font-semibold text-xl lg:text-3xl text-accentcolor lg:text-black dark:text-gray-200">
              Give Feedback !
            </h2>
            <p className="text-base lg:text-lg my-4">
              Share your opinion to us to improve our rendering services
            </p>
            <input
              type="text"
              placeholder="Enter Email"
              className="input dark:bg-gray-900  w-full max-w-xs bg-white"
            />
            <div className='my-3'>
            <textarea
              type="text"
              placeholder=""
              className="input dark:bg-gray-900  w-full max-w-xs bg-white"
            />
            </div>
            
              <button onClick={handleSend} className="btn btn-outline mt-3 rounded-lg ">
                Send
              </button>
         
          </div>
        </div>
      </section>
    );
  };