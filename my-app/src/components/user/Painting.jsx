import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import painting from '../../images/Painting.jpg';
import {  useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import './scrollbar.css';
function Painting() {
  const [Products, setProducts] = useState([]);
  const { category } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [userid, setUserid] = useState("");
  const [name, setName] = useState("");
const [categoryy, setCategory] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [file, setFile] = useState(null);

  const [FilterDataUsers, setFilterDataUsers] = useState([]);
  const [yourSelectedStateValueType, setOptionType] = useState("");


  useEffect(() => {
    axios
      .get(`http://localhost:5000/DrawingAll`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setFilterDataUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error.message));


      axios
    .get('http://localhost:5000/getId')
    .then(function (response) {
      setUserid(response.data[0].userid)})
      .catch(function (error){console.log("Error", error)});

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
  const navigate = useNavigate();



  const handlePageChangeUsers = (event, pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };


  const filterDataByNameUsers = (searchTermUsers) => {
    const filteredDataUsers = Products?.filter((item) =>
      item.name.toLowerCase().includes(searchTermUsers.toLowerCase())
    );
    setFilterDataUsers(filteredDataUsers);
    setCurrentPageUsers(1);
    console.log(searchTermUsers);
  };
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


  function handleRes(Products) {
    let product_id = Products.product_id;
    console.log(product_id);
    navigate(`/Details/${product_id}`);

  }



  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    switch (name) {
      case "name":
        setName(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "description":
        setDescription(value);
        break;
   
      default:
        break;
    }
  };

;
  const files=new FormData();
  files.append('image',file);
  files.append('name',name);
  files.append('category',categoryy);
  files.append('price',price);
  files.append('description',description);
  files.append('userid',userid);

  const handleCreatePost = async () => {
  
console.log(file)



axios
.post("http://localhost:5000/newDrawing",files)
.then(function (response) {


    console.log(response.data);
    axios
    .get(`http://localhost:5000/DrawingAll`)
    .then((response) => {
      console.log(response.data);
      setProducts(response.data);
      setFilterDataUsers(response.data);
      console.log(response.data);
    })
    .catch((error) => console.log(error.message));

       

  }
)
.catch((err) => console.log(err.message));

    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };



  return (

<>

<div
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url(${painting})`,
          height: "400px",
        }}
      >
          <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Painting</h1>
            <nav className="text-white mb-8">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link to="/" onClick={()=>window.scrollTo(0, 0)} className="text-red-500">
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
                <li>Painting</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-7  me-11 ">
  <div className="h-14 w-36 border-2 border-red-600 rounded-lg px-3 py-2 text-red-400 cursor-pointer hover:bg-red-600 hover:text-white" onClick={() => setShowForm(true)}  >
  Add A Drawings
  </div>
</div>

{showForm && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded shadow-md z-50 scrollbar" style={{ width: "580px", maxHeight: "80vh", overflowY: "auto" }}>
            <h2 className="text-2xl font-bold mb-4">Add New Drawings </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name of Drawing
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                description
                </label>
                <textarea
                  id="description"
                  name="description"
                  maxLength={400}
                  rows={5}
                  cols={5}
                  value={description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-bold mb-2"
                >
                  price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
  <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
    Category
  </label>
  <select
    id="category"
    name="category"
    value={category}
    onChange={handleInputChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="">Select a category</option>
    <option value="Illustrations">Illustrations</option>
    <option value="Cartoons">Cartoons </option>
    <option value="Portraits">Portraits</option>
    <option value="LandscapeDrawings">Landscape Drawings</option>
    <option value="Realism">Realism</option>
    <option value="Anime">Anime/Manga</option>
    
  </select>
</div>

<div className="mb-4">
  <label
    htmlFor="photo"
    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
  >
   photo 
  </label>
  <input
    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
    type="file"
    id="photo"
    name="photo"
    onChange={(e) => {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    }}
  />
</div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleCreatePost}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                            Add New Drawings

                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}




<div className="flex flex-col md:flex-row justify-center md:justify-between items-center mx-4 md:mx-0 mt-5 mb-5">
  <div className="w-full md:w-6/12 md:flex-1 mx-4 md:mx-8 shadow shadow-black p-5 rounded-lg bg-white border-solid border-1 border-[#0e0d0d] transform transition duration-300">
    <div className="relative flex items-center">
      <svg
        className="w-4 h-4 fill-current text-primary-gray-dark ml-2"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
       <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />

      </svg>
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
  </div>

  <div className="w-full md:w-6/12 flex flex-col md:flex-row items-center md:items-stretch gap-2 md:gap-4 mt-4">
    <select
      className="px-4 py-3 w-full md:w-48 rounded-md bg-gray-100 border border-red-500 focus:border-red-200 focus:bg-white focus:ring-0 text-sm appearance-none mb-2 md:mb-0"
      value={yourSelectedStateValueType}
      onChange={(e) => setOptionType(e.target.value)}
    >
       <option value="">All Type</option>
      <option value="Illustrations">Illustrations</option>
      <option value="Cartoons">Cartoons</option>
      <option value="Portraits">Portraits</option>
      <option value="LandscapeDrawings">Landscape Drawings</option>
      <option value="Realism">Realism</option>
      <option value="Anime">Anime/Manga</option>
    </select>

    <select
      className="px-4 py-3 w-full md:w-48 rounded-md bg-gray-100 border border-red-500 focus:border-red-200 focus:bg-white focus:ring-0 text-sm appearance-none mb-2 md:mb-0"
      value={yourSelectedStateValueAddress}
      onChange={(e) => setOptionAddress(e.target.value)}
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
      className="w-full md:w-20 h-10 mt-2 md:mt-0 bg-red-500 text-white text-sm font-medium rounded-md"
      onClick={handleFind}
    >
      Find
    </button>
  </div>
</div>

    


<div className="flex flex-wrap gap-10 justify-center my-16">
  {FilterDataUsers
    .filter(
      (Products) =>
        Products.price.toLocaleLowerCase() ===
          yourSelectedStateValueAddress.toLocaleLowerCase() ||
        yourSelectedStateValueAddress.toLocaleLowerCase() === ""
    )
    .slice(startIndexUsers, endIndexUsers)
    .map((Products, index) => (
      <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-base-100 shadow-xl p-4">
        <a href="#" className="group relative block overflow-hidden">
          <img
            src={`http://localhost:5000/${Products.photo}`}
            alt=""
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
        </a>
        <div className="relative p-4">
          <h3 className="mt-4 text-lg font-medium text-gray-900">{Products.name}</h3>
          <p className="mt-1.5 text-sm text-gray-700">{Products.description}</p>
          <p className="mt-1.5 text-sm text-gray-700">{Products.price}</p>
          <form className="mt-4">
            <a
  href="#_"
  className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
  onClick={() => {
    handleRes(Products);
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
    ))}
</div>




      

{ Products.length >=6  && <div className="flex justify-center mb-5 bg-[#f8f8f8]">
      <div className="flex w-full justify-center mt-5 bg-[#f8f8f8] mb-5">
      <Pagination
           count={Math.ceil(Products.length / itemsPerPage)}
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




      </div>}

</>

    )
}

export default Painting