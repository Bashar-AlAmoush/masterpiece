import React from "react";
import { useEffect,useState } from 'react';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiAccountMultipleOutline ,
  mdiCashRegister,
  mdiNotebookEditOutline ,
} from '@mdi/js';
import { mdiSale } from '@mdi/js';
import { mdiDrawPen } from '@mdi/js';
import { mdiDraw } from '@mdi/js';
const Statistics = () => {
  const [users ,setUsers] = useState([])
  const [products ,setproducts] = useState([])
  const [payment ,setPayment] = useState()
  const [ordersData ,setOrdersData] = useState([])
  const [countdrawings, setCountdrawings] = useState(null);
  const [countsales, setCountsales] = useState(null);


   useEffect(()=>{
    axios.get('http://localhost:5000/records')
    .then((response) => {
      setUsers(response.data)
    })
    .catch((error) => console.log(error.message))
      axios.get('http://localhost:5000/productsAll')
      .then((response) => {
        setproducts(response.data);
      })
      .catch((error) => console.log(error.message))
  
  
      axios
        .get('http://localhost:5000/salescount')
        .then(function (response) {
            calculatePrice(response.data);            
        })
  
      
      axios.get('http://localhost:5000/ordersData')
      .then((response) => {
        setOrdersData(response.data);
      })
      .catch((error) => console.log(error.message))


      axios
      .get('http://localhost:5000/drawingscount')
      .then(function (response) {
          setCountdrawings(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });



      axios.get('http://localhost:5000/salescount')
      .then((response) => {
        setCountsales(response.data);
      })
      .catch((error) => console.log(error.message))


  }, []);
  

  const calculatePrice = (salesData) => {
    const total = salesData.reduce((acc, sale) => acc + parseFloat(sale.price), 0);
    setPayment(total);
  };

  return (
    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6 p-10">
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px]">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-[#f4f7fe] p-3 dark:bg-navy-700 ">
            <span className="flex items-center text-brand-500 dark:text-white">
            <Icon className="text-red-500" path={mdiCashRegister} size={1} />
            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">Earnings</p>
          <h4 className="text-xl font-bold text-red-500 dark:text-white">
            $ {payment}
          </h4>
        </div>
      </div>
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px] ">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-[#f4f7fe] p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
            <Icon className="text-red-500" path={mdiAccountMultipleOutline} size={1} />

            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">
            Total Users
          </p>
          <h4 className="text-xl font-bold text-red-500 dark:text-white">
            {users.length}
          </h4>
        </div>
      </div>
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px] ">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-[#f4f7fe] p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
            <Icon className="text-red-500" path={mdiDraw} size={1} />


            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">Total Products</p>
          <h4 className="text-xl font-bold text-red-500 dark:text-white">
            {products.length}
          </h4>
        </div>
      </div>
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px] ">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-[#f4f7fe] p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
            <Icon className="text-red-500" path={mdiDrawPen} size={1} />
            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">Total Drawings </p>
          <h4 className="text-xl font-bold text-red-500 dark:text-white">
            {countdrawings?.count} 
          </h4>
        </div>
      </div>
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px] ">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-[#f4f7fe] p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
            <Icon className="text-red-500" path={mdiNotebookEditOutline} size={1} />

            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">Total orders</p>
          <h4 className="text-xl font-bold text-red-500 dark:text-white">
            {ordersData.length}
          </h4>
        </div>
      </div>
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px] ">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-[#f4f7fe] p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
            <Icon className="text-red-500" path={mdiAccountMultipleOutline} size={1} />

            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">
          Total Products Sales
          </p>
          <h4 className="text-xl font-bold text-red-500 dark:text-white">
            {countsales?.length}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
