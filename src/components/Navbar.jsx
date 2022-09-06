import React from 'react';

const Navbar = () => {


  return (
    <div className='flex items-center h-24 max-w-[1240px] mx-auto px-4 gap-7'>
     <img className='object-contain h-36 w-15'alt="Partly cloudy" src="//ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" />
   <div><h1 className='w-full text-7xl  '>32<sup className='align-top text-xl text-gray-500'>°C |°F</sup></h1></div>  
    <div><ul className='text-base text-gray-500 float-right'>
      <li>Precipitation: 10%</li>
      <li>Humidity: 77%</li>
      <li>Wind: 6 km/h</li>
      <h1 className='float-right text-xl'>Bhilwara, Rajasthan</h1>
      </ul></div> 
   
  
  </div>
  );
};

export default Navbar;
