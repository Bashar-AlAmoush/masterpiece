import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';

function Stat() {
    const [countuser, setCountsuer] = useState(null);
    const [countproduct, setCountproduct] = useState(null);
    const [countdrawings, setCountdrawings] = useState(null);
    const getdata=()=>{
        axios
        .get('http://localhost:5000/usercount')
        .then(function (response) {
            setCountsuer(response.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
        axios
        .get('http://localhost:5000/Productcount')
        .then(function (response) {
            setCountproduct(response.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
        axios
        .get('http://localhost:5000/drawingscount')
        .then(function (response) {
            setCountdrawings(response.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }



    useEffect(() => {
        getdata();
        
      }, []);


  return (
   <>
<section className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
    <hr className="w-48 h-1 mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700"/>

    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        Welcome to Masterpiece Statistics
      </h2>
      <p className="mt-4 text-gray-500 sm:text-xl">
        Explore the insights and data that drive our eCommerce business.
      </p>
    </div>

    <div className="mt-8 sm:mt-12">
      <dl className="flex flex-col gap-8 sm:grid sm:grid-cols-3">
        <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
          <dt className="text-lg font-medium text-gray-500">
            Total Drawings
          </dt>
          <div className="flex items-center justify-center">
            <dd className="text-2xl sm:text-4xl font-extrabold text-red-500">
              {countdrawings?.count}
            </dd>
          </div>
        </div>

        <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
          <dt className="text-lg font-medium text-gray-500">
            Total Products
          </dt>
          <div className="flex items-center justify-center">
            <dd className="text-2xl sm:text-4xl font-extrabold text-red-500">
              {countproduct?.count}
            </dd>
          </div>
        </div>

        <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
          <dt className="text-lg font-medium text-gray-500">
            Total Users
          </dt>
          <div className="flex items-center justify-center">
            <dd className="text-2xl sm:text-4xl font-extrabold text-red-500">
              {countuser?.count}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  </div>
</section>


   




   </>
  )
}

export default Stat