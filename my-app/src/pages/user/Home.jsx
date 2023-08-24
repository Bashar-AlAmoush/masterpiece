import Stat from "../../components/user/Stat";
import React from 'react'
import Hero from "../../components/user/Hero";
import AboutHome from "../../components/user/AboutHome";
import CategoryHome from "../../components/user/CategoryHome";
import Sales from "../../components/user/Sales"
import { ToastContainer } from 'react-toastify';
import DrawingHome from "../../components/user/DrawingHome";
function Home() {
  return (
    <>
       <ToastContainer />
      <Hero/>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700"/>
      <AboutHome/>
      <div className="bg-white mt-10 shadow-lg">
<CategoryHome/>
<hr className="w-48 h-1 mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700"/>
        <Sales/>
      </div>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700"/>
      <DrawingHome/>
<Stat/>
          </>


  )
}

export default Home;