import React from "react";
import { useEffect,useState } from 'react';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiAccountMultipleOutline ,
  mdiCashRegister,
  mdiSilverwareForkKnife ,
  mdiTableFurniture,
  mdiNotebookEditOutline ,
} from '@mdi/js';

const Statistics = () => {


  const [users ,setUsers] = useState([])
  const [restaurant ,setRestaurant] = useState([])
  const [payment ,setPayment] = useState()
  const [ordersData ,setOrdersData] = useState([])
  const [restaurantTables ,setRestaurantTables] = useState([])
  const [pendingTables ,setPendingTables] = useState([])
  
  
   useEffect(()=>{
  
  
    axios.get('http://localhost:5000/records')
    .then((response) => {
      setUsers(response.data)
    })
    .catch((error) => console.log(error.message))
  
  
      axios.get('http://localhost:5000/restaurants')
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => console.log(error.message))
  
  
      axios.get('http://localhost:5000/paymentData')
      .then((response) => {
        setPayment(response.data);
      })
      .catch((error) => console.log(error.message))
  
      
      axios.get('http://localhost:5000/ordersData')
      .then((response) => {
        setOrdersData(response.data);
      })
      .catch((error) => console.log(error.message))
  
      axios.get('http://localhost:5000/restaurantTables')
      .then((response) => {
        setRestaurantTables(response.data.restaurantTables);
        setPendingTables(response.data.pendingTables);
      })
      .catch((error) => console.log(error.message))
  
      
  
  }, []);
  
  console.log(users)
  console.log(restaurant)
  console.log(payment)
  console.log(ordersData)
  console.log(restaurantTables)
  











  return (
    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6 p-10">
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px]">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-[#f4f7fe] p-3 dark:bg-navy-700 ">
            <span className="flex items-center text-brand-500 dark:text-white">
            <Icon className="text-amber-500" path={mdiCashRegister} size={1} />
            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">Earnings</p>
          <h4 className="text-xl font-bold text-amber-500 dark:text-white">
            $ {payment*5}
          </h4>
        </div>
      </div>
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px] ">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-[#f4f7fe] p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
            <Icon className="text-amber-500" path={mdiAccountMultipleOutline} size={1} />

            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">
            Total Users
          </p>
          <h4 className="text-xl font-bold text-amber-500 dark:text-white">
            {users.length}
          </h4>
        </div>
      </div>
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px] ">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-[#f4f7fe] p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
            <Icon className="text-amber-500" path={mdiSilverwareForkKnife} size={1} />
            

            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">Total Restaurants</p>
          <h4 className="text-xl font-bold text-amber-500 dark:text-white">
            {restaurant.length}
          </h4>
        </div>
      </div>
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px] ">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-[#f4f7fe] p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
            <Icon className="text-amber-500" path={mdiTableFurniture} size={1} />

            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">Total tables</p>
          <h4 className="text-xl font-bold text-amber-500 dark:text-white">
            {restaurantTables.length}
          </h4>
        </div>
      </div>
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px] ">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-[#f4f7fe] p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
            <Icon className="text-amber-500" path={mdiNotebookEditOutline} size={1} />

            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">Total orders</p>
          <h4 className="text-xl font-bold text-amber-500 dark:text-white">
            {ordersData.length}
          </h4>
        </div>
      </div>
      <div className="!z-5 relative flex flex-col rounded-[20px] bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none !flex-row flex-grow items-center rounded-[20px] ">
        <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
          <div className="rounded-full bg-[#f4f7fe] p-3 dark:bg-navy-700">
            <span className="flex items-center text-brand-500 dark:text-white">
            <Icon className="text-amber-500" path={mdiAccountMultipleOutline} size={1} />

            </span>
          </div>
        </div>
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <p className="font-dm text-sm font-medium text-white">
            Pending Tables
          </p>
          <h4 className="text-xl font-bold text-amber-500 dark:text-white">
            {pendingTables.length}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
