import React from 'react';
import bannerImage from '../assets/Image-gallery-images/banner-image.png'
import { Icon } from '@iconify/react';

const Banner = () => {
    return (
        <div className='container mx-auto py-10'>
            <div className='flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-5 xl:mx-0 mx-5'>
                <div className='w-full lg:text-left text-center animate__animated animate__fadeInDown'>
                    <h3 className='md:text-4xl text-3xl font-bold mb-5 uppercase text-[#00226D]'>Completed <span className='text-[#1179EF]'>Image Gallery</span> Task</h3>
                    <h5 className='text-xl font-semibold mb-5 text-[#1179EF] '>Fresher React JS Developer</h5>
                    <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum inventore possimus beatae similique mollitia dolore fugit! Sunt unde repudiandae quo quas illo dolor ducimus amet, doloremque, aliquid eius iusto provident qui facilis eum dolore modi? Deserunt, incidunt dicta quasi similique atque aperiam iusto quis cupiditate voluptas dolorem assumenda sequi laborum.</p>
                    <button onClick={() => window.scrollTo(0, 850)} className='btn bg-[#1179EF] lg:mx-0 md:w-auto mx-auto text-white font-semibold rounded-full px-5 py-3 mt-10 animate__animated animate__pulse animate__infinite	infinite animate__slow 2s flex items-center gap-3'>Please Check The Completed Task <Icon icon="el:hand-down" className='text-2xl' /></button>
                </div>
                <div className='w-full'>
                    <img src={bannerImage} className='w-full animate__animated animate__pulse animate__slow	2s' alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;