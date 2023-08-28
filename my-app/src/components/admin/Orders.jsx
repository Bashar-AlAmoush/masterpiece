import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "pure-react-carousel/dist/react-carousel.es.css";

function Orders() {

    const [orders, setorders] = useState([]);
    const [userorders, usersetorders] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
      axios.get('http://localhost:5000/datauserorders')
      .then((response) => {
        usersetorders(response.data)
        setFilterDatauser(response.data)
      })
      .catch((error) => console.log(error.message))
    }, []);
const [searchTeruser, setSearchTeruser] = useState("");
const [FilterDatauser, setFilterDatauser] = useState([]);

const filterDataByOrders = (searchTermUsers) => {

  const filteredDataUsers = userorders.filter((item) =>
    item.username.toLowerCase().includes(searchTermUsers.toLowerCase())
  );
  setFilterDatauser(filteredDataUsers);
  setCurrentPageOrders(1);
};

const [currentPageOrders, setCurrentPageOrders] = useState(1);
let totalItemsUsers;

let totalPagesUsers;

let slicedArrayUsers;

const itemsPerPage = 4;

totalItemsUsers = FilterDatauser.length;

totalPagesUsers = Math.ceil(totalItemsUsers / itemsPerPage);

const startIndexUsers = (currentPageOrders - 1) * itemsPerPage;

const endIndexUsers = startIndexUsers + itemsPerPage;

slicedArrayUsers = FilterDatauser.slice(startIndexUsers, endIndexUsers);
const handlePageChangeUsers = (event, pageNumber) => {
  setCurrentPageOrders(pageNumber);
};


const handleButtonClick = (userid) => {
        axios.get(`http://localhost:5000/ordersData/`+userid)
        .then((response) => {
          setorders(response.data);
        })
        .catch((error) => console.log(error.message))
};


  return (
    <>
    <div className="bg-[#ffffff] mr-5 ml-5 p-10 rounded-2xl min-h-[calc(100vh)]">
        <div className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
          Orders Table
          </div>
        </div>

        <form>
          <div className="relative mt-5 ">
            <input
              type="text"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required=""
              value={searchTeruser}
              onChange={(e) => {
                setSearchTeruser(e.target.value);
                filterDataByOrders(e.target.value);
              }}
            />
          </div>
        </form>

        <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
        
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
        Email
        </th>
        <th scope="col" className="px-6 py-3">
        Phone Number
        </th>
        <th scope="col" className="px-6 py-3">
        Detail
        </th>
      </tr>
    </thead>

    {slicedArrayUsers.map((e) => {

  return (
    <tbody key={e.userid}>
      <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 `}>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {e.username}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {e.email}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {e.phone_number}
        </td>
        <td className="px-6 py-4">
          <button  className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => {
  setShowPopup(true);
  handleButtonClick(e.userid);
}}>
            View Order
          </button>
          {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg max-h-full w-full overflow-y-auto">
                    {orders.map((order) => (
                      <div key={order.id}>
                        <div className="mt-2 text-gray-700">
                          <div className="justify-between rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                            <img 
                            src={`http://localhost:5000/${order.photo}`}
                            alt="product-image" className="w-full rounded-lg sm:w-40" style={{ width: "100px" }} />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-4 flex flex-col space-y-2 sm:mt-0 sm:space-y-6 sm:space-x-6">
                                <p className="text-sm ms-6">Product Name: {order.name}</p>
                                <p className="text-sm">Price JD: {order.price}</p>
                                <p className="text-sm">Product Category: {order.category}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => setShowPopup(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                      Close
                    </button>
                  </div>
                </div>
              )}
        </td>
      </tr>
    </tbody>
  );
})}

  </table>
</div>




          <div className="flex w-full justify-center mt-5 bg-white">
        {
          <Pagination
            count={totalPagesUsers}
            page={currentPageOrders}
            onChange={handlePageChangeUsers}
          />
        }
      </div>
        </div>
      </div>



      
      <div className="bg-gray-800">
            <div className="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
                
              
            </div>
            <style>{`
                .slider {
                    width: 200px;
                    height: 400px;
                    position: relative;
                    overflow: hidden;
                }
    
                .slide-ana {
                    height: 360px;
                }
    
                .slide-ana > div {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    transition: all 0.7s;
                }
    
                @media (min-width: 200px) and (max-width: 639px) {
                    .slider {
                        height: 300px;
                        width: 170px;
                    }
                }
            `}</style>
        </div>
    </>
  )
}

export default Orders