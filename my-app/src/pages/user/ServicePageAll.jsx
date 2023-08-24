import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import EQUIPMENT from '../../images/EQUIPMENTpage.jpg'
const ServicePageAll = () => {
  const [product, setproducts] = useState([]);
  const [FilterDataUsers, setFilterDataUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/productsAll")
      .then((response) => {
        console.log(response.data);
        setproducts(response.data);
        setFilterDataUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  const navigate = useNavigate();
  
  function handleRes(Products) {
    let product_id = Products.product_id;
    console.log(product_id);
 window.scrollTo(0, 0)
    navigate(`/Details/${product_id}`);
  }

  const [yourSelectedStateValueType, setOptionType] = useState("");
  const [yourSelectedStateprice, setOptionprice] = useState("");
  //-----------------------search------------------------//
  
  const [searchTermUsers, setSearchTermUsers] = useState("");

  const [currentPageUsers, setCurrentPageUsers] = useState(1);


  const filterDataByNameUsers = (searchTermUsers) => {
    const filteredDataUsers = product?.filter((item) =>
      item.name.toLowerCase().includes(searchTermUsers.toLowerCase())
    );
    setFilterDataUsers(filteredDataUsers);
    setCurrentPageUsers(1);
    console.log(searchTermUsers);
  };

  function handleFind() {
    console.log(product[0].category.toLowerCase());
    const filteredDataUsers = product?.filter((item) =>
    item.category
      ?.toLowerCase()
      .includes(yourSelectedStateValueType.toLowerCase()) &&
    item.price
      .includes(yourSelectedStateprice.toLowerCase())
  );
    setFilterDataUsers(filteredDataUsers);
  }
  let totalItemsUsers;

  let totalPagesUsers;

  let slicedArrayUsers;

  const itemsPerPage = 6;

  totalItemsUsers = FilterDataUsers.length;

  totalPagesUsers = Math.ceil(totalItemsUsers / itemsPerPage);

  const startIndexUsers = (currentPageUsers - 1) * itemsPerPage;

  const endIndexUsers = startIndexUsers + itemsPerPage;

  slicedArrayUsers = FilterDataUsers.slice(startIndexUsers, endIndexUsers);

  const handlePageChangeUsers = (event, pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };

  return (
    <>
      <div
        className="bg-cover bg-center h-screen shadow"
        style={{
          backgroundImage:
            `url(${EQUIPMENT})`,
          height: "400px", marginBottom: "50px"
        }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">EQUIPMENT</h1>

            <nav className="text-white mb-8">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link to="/" className="text-red-500" onClick={() => window.scrollTo(0, 0)} >
                    Home
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mx-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </li>
                <li>EQUIPMENT</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
<div className="flex flex-col gap-3 px-5 md:flex-row justify-center md:justify-between items-center mx-4 md:mx-0 ">
<form 
className="w-full"
> 
    <label
      htmlFor="default-search"
      className=" text-sm font-medium text-gray-900 sr-only dark:text-white"
    >
      Search
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full h-12   pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search Mockups, Logos..."
        required=""
        value={searchTermUsers}
        onChange={(e) => {
          setSearchTermUsers(e.target.value);
          filterDataByNameUsers(e.target.value);
        }}
      />
    </div>
  </form>
  <div 
  className="w-full md:w-6/12 flex flex-col md:flex-row items-center md:items-stretch gap-2 md:gap-4 "
  >
    <select
      className="px-4 py-3 w-full md:w-48 rounded-md bg-gray-100 border border-red-500 focus:border-red-200 focus:bg-white focus:ring-0 text-sm appearance-none mb-2 md:mb-0"
      value={yourSelectedStateValueType}
      onChange={(e) => setOptionType(e.target.value)}
    >
       <option value="">All Type</option>
      <option value="paints">Paints</option>
      <option value="paper">Paper</option>
      <option value="drawing">Drawing</option>
      <option value="canvas">Canvas</option>
      <option value="tools">Tools</option>
      <option value="canvas">canvas</option>
    </select>
    <select
      className="px-4 py-3 w-full md:w-48 rounded-md bg-gray-100 border border-red-500 focus:border-red-200 focus:bg-white focus:ring-0 text-sm appearance-none mb-2 md:mb-0"
      value={yourSelectedStateprice}
      onChange={(e) => setOptionprice(e.target.value)}
    >
    <option value="">All Price</option>
      <option value="4.99">jD 0.00-Jd 4.99</option>
      <option value="9.99">jD 5.00-Jd 9.99</option>
      <option value="14.99">jD 10.00-Jd 14.99</option>
      <option value="19.99">jD 15.00-Jd 19.99</option>
      <option value="24.99">jD 20.00-Jd 24.99</option>
      <option value="29..99">jD 24.00-Jd 29.99</option>
    </select>
    <button
      className="w-full  md:w-20 h-12 mt-2 md:mt-0 bg-red-500 text-white text-sm font-medium rounded-md"
      onClick={handleFind}
    >
      Find
    </button>
  </div>
</div>
      <div >
        <div className="flex flex-wrap gap-10 justify-center my-16 ">
          {slicedArrayUsers?.map((product, index) => {
            return (
              <>    
      <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-base-100 shadow-xl p-4">

  <a href="#" className="group relative block overflow-hidden">
  <img
         src={`http://localhost:5000/${product.photo}`}   alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
  />
  </a>
  <div className="relative border border-gray-100 bg-white p-6">
    <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
    <p className="mt-1.5 text-sm text-gray-700">{product.description}</p>
    <p className="mt-1.5 text-sm text-gray-700">{product.price}</p>
    <form className="mt-4">
   <a
  href="#_"
  className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
  onClick={() => {
    handleRes(product);
  }}
>
  <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-red-600 group-hover:w-full ease" />
  <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-red-600 group-hover:w-full ease" />
  <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-red-600 orange-hover:h-full ease" />
  <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-red-600 orange-hover:h-full ease" />
  <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-red-600 opacity-0 group-hover:opacity-100" />
  <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
  View Details
  </span>
</a>
    </form>
  </div>
</div>
              </>
            );
          })}
        </div>
        { product.length >=4  &&
      <div className="flex w-full justify-center mt-5 bg-[#f8f8f8] mb-5">
      <Pagination
        count={totalPagesUsers}
        page={currentPageUsers}
        onChange={handlePageChangeUsers}
        shape="rounded"
        color="error"
        siblingCount={1}
        boundaryCount={1}
        className="custom-pagination"
        style={{ color: 'white' }}
      />
    </div>
    
}
      </div>
    </>
  );
};

export default ServicePageAll;