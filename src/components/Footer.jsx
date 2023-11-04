import { Icon } from '@iconify/react';
import React from 'react';

const Footer = () => {
    return (
        <div className='bg-white py-10'>
            <div className='container mx-auto '>
                <div className="flex md:flex-row flex-col gap-5 items-center justify-between xl:mx-0 mx-5">
                    <h2 className="lg:text-2xl text-xl font-bold text-[#00226D] md:block hidden">Kaykobad <span className="text-[#1179EF]">Yiasin</span></h2>
                    <p className='text-[#00226D]'>© Copyright 2023 by <a href='#' className='text-[#1179EF]'>Kaykobad Yiasin</a>. All Rights Reserved.</p>

                    <ul className='flex items-center gap-5'>
                        <li><a href='https://www.linkedin.com/in/kaykobadyiasin/' rel="noreferrer" target='_blank'><Icon icon="mdi:linkedin" className='text-3xl text-[#00226D]' /></a></li>
                        <li><a href='https://github.com/kaykobadyiasin' rel="noreferrer" target='_blank'><Icon icon="mdi:github" className='text-3xl text-[#00226D]' /></a></li>
                        <li><a href='https://kaykobadyiasin-portfolio.web.app/' rel="noreferrer" target='_blank'><Icon icon="fontisto:world" className='text-3xl text-[#00226D]' /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;