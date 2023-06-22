import React, { useState } from 'react'
import Statistics from '../../components/admin/Statistics';



const MainDashboard = () => {

  return (
  

<div className='bg-[#f5f8fe] pt-10 pb-10'>

<Statistics/>

<>
 
  <div className="md:mt-14 mt-4 relative sm:flex items-center justify-center">
    <img
      src="https://i.ibb.co/KjrPCyW/map.png"
      alt="world map image"
      className="w-full xl:h-full h-96 object-cover object-fill sm:block hidden"
    />
    <img
      src="https://i.ibb.co/SXKj9Mf/map-bg.png"
      alt="mobile-image"
      className="sm:hidden -mt-10 block w-full h-96 object-cover object-fill absolute z-0"
    />
    <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-amber-500 rounded-lg sm:absolute relative z-20 sm:mt-0 mt-4 left-0 xl:ml-56 sm:ml-12 xl:-mt-40 sm:-mt-12">
      <p className="text-3xl font-semibold text-gray-800">20K+</p>
      <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
        Recently Property Listed
      </p>
    </div>
    <div className="shadow-lg xl:p-6 p-4 w-48 sm:w-auto w-full bg-amber-500 rounded-lg sm:absolute relative z-20 sm:mt-0 mt-4 xl:mt-80 sm:mt-56 xl:-ml-0 sm:-ml-12">
      <p className="text-3xl font-semibold text-gray-800">8K+</p>
      <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
        Active Listening
      </p>
    </div>
    <div className="shadow-lg xl:p-6 p-4 sm:w-auto w-full bg-amber-500 rounded-lg sm:absolute relative z-20 md:mt-0 sm:-mt-5 mt-4 right-0 xl:mr-56 sm:mr-24">
      <p className="text-3xl font-semibold text-gray-800">15K+</p>
      <p className="text-base leading-4 xl:mt-4 mt-2 text-gray-600">
        Recently Sold Lands
      </p>
    </div>
    {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
  </div>
</>








</div>

  );
}

export default MainDashboard