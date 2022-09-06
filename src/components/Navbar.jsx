import {React,useState,useEffect} from 'react';
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from 'react-icons/io';
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
} from 'react-icons/bs';
import axios from 'axios';
import { ImSpinner8 } from 'react-icons/im';

const APIkey = '63d999d879a60232afce063d9cea3f41';
const Navbar = () => {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Bhilwara');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {

    if (inputValue !== '') {

      setLocation(inputValue);
    }


    const input = document.querySelector('input');


    if (input.value === '') {

      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }


    input.value = '';


    e.preventDefault();
  };


  useEffect(() => {
  
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios
      .get(url)
      .then((res) => {
       
        setTimeout(() => {
          setData(res.data);
        
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 1000);
  
    return () => clearTimeout(timer);
  }, [errorMsg]);


  if (!data) {
    return (
      <div className='w-full h-screen  bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <div>
          <ImSpinner8 className='text-5xl animate-spin text-black' />
        </div>
      </div>
    );
  }

  
  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy className='text-[#31cafb]' />;
      break;
    case 'Clear':
      icon = <IoMdSunny className='text-[#ffde33]' />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#31cafb]' />;
      break;
    case 'Snow':
      icon = <IoMdSnow className='text-[#31cafb]' />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;
  }

 
  const date = new Date();

  return (
    <div className='mt-10 flex items-center h-24 max-w-[1240px] mx-auto px-4'>
      {errorMsg && (
        <div className='z-40 w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md'>{`${errorMsg.response.data.message}`}</div>
      )}
       <form
        className={`${
          animate ? 'animate-shake' : 'animate-none'
        } h-16 bg-black/30 w-full max-w-[450px]
      rounded-full backdrop-blur-[32px] mb-8 align-middle`}
      >
        <div className='h-full relative flex items-center justify-between p-2'>
          <input
            onChange={(e) => handleInput(e)}
            className='flex-1 bg-transparent outline-none placeholder:text-white text-black text-[15px] font-light pl-6 h-full'
            type='text'
            placeholder='Search by city or country'
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition'
          >
            <IoMdSearch className='text-2xl text-white' />
          </button>
        </div>
      </form>
      <div>
      {loading ? (
          <div className='w-full h-full flex justify-center items-center'>
            <ImSpinner8 className='text-black text-5xl animate-spin' />
          </div>
        ) : (
    <div className='flex items-center h-24 max-w-[1240px] mx-auto px-4 gap-7'>
    
      <div className='text-9xl'>{icon}</div>    
   <div><h1 className='w-full text-7xl  '>{parseInt(data.main.temp)}<sup className='align-top text-xl text-gray-500'>°C</sup>

   </h1></div>  
    <div><ul className='text-base text-gray-500 float-right'>
      <li>Visibility : {' '}
                    <span className='ml-2'>{data.visibility / 1000} km</span></li>
      <li>Humidity : {data.main.humidity} %</li>
      <li>Wind  :  {data.wind.speed} m/s</li>
      <h1 className='px-[-5] float-right text-xl'>{data.name}, {data.sys.country}</h1>
      </ul>
      
      </div>
      </div>)}
      <div className='py-3 px-10 text-gray-500'>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
               
                </div>
     
  
  </div>
  );
};

export default Navbar;
