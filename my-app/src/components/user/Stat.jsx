import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';

function Stat() {


    const [countuser, setCountsuer] = useState(null);
    const [countproduct, setCountproduct] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

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
        .get('http://localhost:5000/salescount')
        .then(function (response) {
            calculatePrice(response.data);            
        })
        .catch(function (error) {
          console.log(error);
        })

        


    }



    useEffect(() => {
        getdata();
        
      }, []);




      const calculatePrice = (salesData) => {
        const total = salesData.reduce((acc, sale) => acc + parseFloat(sale.price), 0);
        setTotalPrice(total);
      };





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
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div
          className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
        >
          <dt className="order-last text-lg font-medium text-gray-500">
            Total Sales
          </dt>

          <dd className="text-4xl font-extrabold text-red-500 md:text-5xl">
            ${totalPrice}
          </dd>
        </div>

        <div
          className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
        >
          <dt className="order-last text-lg font-medium text-gray-500">
          Total Proudct 
          </dt>

          <dd className="text-4xl font-extrabold text-red-500 md:text-5xl">{countproduct?.count}</dd>
        </div>

        <div
          className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
        >
          <dt className="order-last text-lg font-medium text-gray-500">
            Total Users
          </dt>

          <dd className="text-4xl font-extrabold text-red-500 md:text-5xl">{countuser?.count}</dd>
        </div>
      </dl>
    </div>
  </div>
  </section> 
   




   </>
  )
}

export default Stat