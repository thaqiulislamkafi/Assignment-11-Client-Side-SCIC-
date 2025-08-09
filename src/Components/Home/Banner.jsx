import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Typewriter } from 'react-simple-typewriter'

const Banner = () => {
    return (
        <div>

            <Swiper modules={[Autoplay]} onSlideChange={()=> console.log('slide change')} autoplay={{delay :3000 , disableOnInteraction : false}} loop={true} onSwiper={(swiper) => console.log(swiper)}>
                <SwiperSlide>
                    <div className='banner Slide-1 relative h-screen max-h-[500px] bg-[image:linear-gradient(to_top,black,transparent),url("https://i.postimg.cc/bYBmcMXD/pexels-pixabay-50675.jpg")] bg-cover bg-center sora-font'>
                        <div className='text-white w-[85.94vw] mx-auto'>
                            <p className='cover-title'><Typewriter words={['Gather, Dine, Connect']} loop={true}/></p>
                            
                            <p className='cover-description'>Experience elegant dining in a welcoming setting, where every detail is crafted for connection and celebration.</p>
                            <button className='Button cover-button'>Explore</button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='banner Slide-2 relative h-screen max-h-[500px] bg-[image:linear-gradient(to_top,black,transparent),url("https://i.postimg.cc/CxSN0VKN/pexels-jmark-301987.jpg")] bg-cover bg-center sora-font'>
                        <div className='text-white w-[85.94vw] mx-auto'>
                        
                            <p className='cover-title'><Typewriter words={['Where Minds Meet']} loop={true}/></p>

                            <p className='cover-description'>Be part of insightful discussions, expert talks, and shared learning experiences that spark innovation.</p>
                            <button className='Button cover-button'>Explore</button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='banner Slide-3 relative h-screen max-h-[500px] bg-[image:linear-gradient(to_top,black,transparent),url("https://i.postimg.cc/KYKgS9tf/pexels-pixabay-433452.jpg")] bg-cover bg-center sora-font'>
                        <div className='text-white w-[85.94vw] mx-auto'>
                    
                            <p className='cover-title'><Typewriter words={['Celebrate the Art of Expression']} loop={true}/></p>
                            <p className='cover-description'>Join a vibrant community where creativity, skill, and joy fill the air — one throw at a time</p>
                            <button className='Button cover-button'>Explore</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>


        </div>
    );
};

export default Banner;