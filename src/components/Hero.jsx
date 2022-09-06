import React from 'react';
import Img from '../assets/90.png'

const Hero = () => {
  
 
  return (
    <>
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 '>
      <ul className='hidden divide-x gap-8 md:flex'>
        <li className='p-4'>Temperature</li>
        <li className='p-4'>Precipitation</li>
        <li className='p-4'>Wind</li>
      </ul>
    </div>
    <img className='flex justify-between items-center w-[80%] mx-auto px-4 ' src={Img} alt='/' />
    </>
  );
};

export default Hero;
