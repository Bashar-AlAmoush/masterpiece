import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { Link, useParams, useNavigate } from "react-router-dom";
import service from '../../images/service.jpg'



function ServicePage({ setCurrentTable }) {
  const [Products, setProducts] = useState([]);
  const { category } = useParams();
  console.log(category)
  const [FilterDataUsers, setFilterDataUsers] = useState([]);
  const [yourSelectedStateValueType, setOptionType] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/ServicePage/${category}`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setFilterDataUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error.message));
  }, [category]);


  const [yourSelectedStateValueAddress, setOptionAddress] = useState("");

  const [searchTermUsers, setSearchTermUsers] = useState("");

  const [currentPageUsers, setCurrentPageUsers] = useState(1);

  useEffect(() => {
    const totalItemsUsers = Products.length;
    const totalPagesUsers = Math.ceil(totalItemsUsers / itemsPerPage);
    setCurrentPageUsers(1);
  }, [Products]);
  const itemsPerPage = 6;
  const startIndexUsers = (currentPageUsers - 1) * itemsPerPage;
  const endIndexUsers = startIndexUsers + itemsPerPage;

  const handlePageChangeUsers = (event, pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };

  const navigate = useNavigate();


  function handleRes(Products) {
    let product_id = Products.product_id;
    console.log(product_id);
    navigate(`/Details/${product_id}`);

  }
  const filterDataByNameUsers = (searchTermUsers) => {
    const filteredDataUsers = Products?.filter((item) =>
      item.name.toLowerCase().includes(searchTermUsers.toLowerCase())
    );
    setFilterDataUsers(filteredDataUsers);
    setCurrentPageUsers(1);
    console.log(searchTermUsers);
  };

  function handleTable(element) {
    setCurrentTable(element)

  }

  function handleFind() {
    console.log(Products[0].category.toLowerCase());
    const filteredDataUsers = Products?.filter((item) =>
    item.category
      ?.toLowerCase()
      .includes(yourSelectedStateValueType.toLowerCase()) &&
    item.price
      ?.toLowerCase()
      .includes(yourSelectedStateValueAddress.toLowerCase())
  );
    setFilterDataUsers(filteredDataUsers);
  }


  return (
    <>

<div
        className="bg-cover bg-center h-screen shadow"
        style={{
          backgroundImage:
            `url(${service})`,
          height: "400px", marginBottom: "50px"
        }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">EQUIPMENT</h1>

            <nav className="text-white mb-8">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link to="/" className="text-red-500">
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



   

<div className="flex justify-center mt-5 mb-5">
        <div className="w-full md:w-full mx-8 shadow shadow-black p-5 rounded-lg bg-white border-solid border-1 border-[#0e0d0d] transform transition duration-300 ">
          <div className="relative">
            <div className="absolute flex items-center ml-2 h-full">
              <svg
                className="w-4 h-4 fill-current text-primary-gray-dark"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by listing, location, bedroom number..."
              className="px-8 py-3 w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              value={searchTermUsers}
              onChange={(e) => {
                setSearchTermUsers(e.target.value);
                filterDataByNameUsers(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="font-medium">Filters</p>
          </div>
          <div className="flex justify-between">
            <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 ">
              <select
                className="px-4 py-3 w-48 md:w-60 rounded-md bg-gray-100 border-red-500 border-2 focus:border-red-200 focus:bg-white focus:ring-0 text-sm appearance-none mr-5"
                value={yourSelectedStateValueType}
                onChange={(e) => setOptionType(e.target.value)}
              >
                <option value="">All Type</option>
                <option value="Paints">Paints</option>
                <option value="Paper">Paper</option>
                <option value="Drawing">Drawing</option>
                <option value="Canvas">Canvas</option>
                <option value="Tools">Tools</option>
                <option value="brush">brush</option>
              </select>

              <select
                className="px-4 py-3 w-48 md:w-60 rounded-md bg-gray-100 border-red-500 border-2 focus:border-red-200 focus:bg-white focus:ring-0 text-sm appearance-none"
                value={yourSelectedStateValueAddress}
                onChange={(e) => setOptionAddress(e.target.value)}>
                <option value="">All Price</option>
                <option value="4.99">jD 0.00-Jd 4.99</option>
                <option value="9.99">jD 5.00-Jd 9.99</option>
                <option value="14.99">jD 10.00-Jd 14.99</option>
                <option value="19.99">jD 15.00-Jd 19.99</option>
                <option value="24.99">jD 20.00-Jd 24.99</option>
                <option value="29.99">jD 24.00-Jd 29.99</option>
                
              </select>
            </div>
            <button
              className=" w-20 h-10 bg-red-500 px-4 py-2  text-white text-sm font-medium rounded-md"
              onClick={handleFind}
            >
              Find
            </button>
          </div>
        </div>
      </div>


      <div className="flex flex-wrap gap-10 justify-center my-16">
        {FilterDataUsers
          .filter(
            (Products) =>
            Products.price.toLocaleLowerCase() === yourSelectedStateValueAddress.toLocaleLowerCase() ||
              yourSelectedStateValueAddress.toLocaleLowerCase() === ""
          )
          .slice(startIndexUsers, endIndexUsers)
          .map((Products, index) => (
            <div className="card card-compact w-100 bg-base-100 shadow-xl">
{console.log(Products.photo)}
  <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
   
   
  </button>
  <a href="#" className="group relative block overflow-hidden">
  <img

         src={`http://localhost:5000/${Products.photo}`}     alt=""
  
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"style={{width: '100%', height: ''}}
  />
  </a>
  <div className="relative border border-gray-100 bg-white p-6">
   
    <h3 className="mt-4 text-lg font-medium text-gray-900">{Products.name}</h3>
    <p className="mt-1.5 text-sm text-gray-700">{Products.description}</p>
    <p className="mt-1.5 text-sm text-gray-700">{Products.price}</p>
    <form className="mt-4">
    <button
                        onClick={() => {
                          handleRes(Products);
                        }}
                        className="btn buttonNav border-none bg-red-500 px-8 py-3 text-black mr-4"
                      >
                        View Details 
                      </button>
    </form>
  </div>

</div>
          ))}
      </div>


      { Products.length >=6  && <div className="flex justify-center mb-5 bg-[#f8f8f8]">
        <Pagination
          count={Math.ceil(Products.length / itemsPerPage)}
          page={currentPageUsers}
          onChange={handlePageChangeUsers}
          color="primary"
          size="large"
        />
      </div>}
    </>
  );
};

export default ServicePage;
