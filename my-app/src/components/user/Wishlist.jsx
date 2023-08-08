import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
function Wishlist() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [id, setId] = useState();
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/getId')
      .then(function (response) {
        setId(response.data[0].userid);
        axios.get(`http://localhost:5000/getuserwishlist/${response.data[0].userid}`)
          .then(function (response) {
            setWishlist(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const toggleShowDetails = (productId) => {
    setSelectedProductId(productId === selectedProductId ? null : productId);
  };

  function handleproduct(Products) {
    let product_id = Products.product_id;
    console.log(product_id);
    navigate(`/Details/${product_id}`);
  }

  const handleRemoveProduct = (index) => {
    const updatedCart = [...wishlist];
    const removedProduct = updatedCart.splice(index, 1)[0];
    setWishlist(updatedCart);
    console.log(removedProduct.product_id);

    axios
      .delete(`http://localhost:5000/deletewishlistdata`, {
        data: {
          user_id: id,
          product: removedProduct
        }
      })
      .then(function (response) {
        axios
          .get(`http://localhost:5000/getuserwishlist/${id}`)
          .then(function (response) {
            setWishlist(response.data);
            console.log(response.data);
            toast.error(`Product "${removedProduct.name}" has been removed from the wishlist.`);

          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });

  };
  return (
    <>
      <ToastContainer />
        <div className="text-start p-10 my-10 mx-40 ">
          <div>
            <Link to="/" >
              <p className="text-sm leading-4 text-gray-600">Home</p>
            </Link>
          </div>
          <div className="mt-3">
            <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">Favorites</h1>
          </div>
          <div className="mt-4">
            <p className="text-2xl tracking-tight leading-6 text-gray-600">{wishlist.length} Items</p>
          </div>  </div>
        <section
          id="Projects"
          className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          {wishlist.map((pro, index) => (
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <button
                aria-label="close"
                className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 text-white hover:text-gray-400"
                onClick={() => handleRemoveProduct(index)}  >
                <svg
                  className="fill-current"
                  width={14}
                  height={14}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1L13 13"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className='cursor-pointer' onClick={() => {
                handleproduct(pro);
              }}>
                <img
                  src={`http://localhost:5000/${pro.photo}`} alt="Product"
                  className="h-80 w-72 object-cover rounded-t-xl"
                />
                <div className="px-4 py-3 w-72">

                  <p className="text-lg font-bold text-black truncate block capitalize">
                    {pro.name}
                  </p>
                  <p className="text-lg font-bold text-black truncate block capitalize">
                    Description: {pro.description}
                  </p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">
                      JD: {pro.price}
                    </p>

                    <div className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="currentColor"
                        className="bi bi-bag-plus"
                        viewBox="0 0 16 16"
                        onClick={() => {
                          handleproduct(pro);
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                        />
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
    </>
  );
}

export default Wishlist;
