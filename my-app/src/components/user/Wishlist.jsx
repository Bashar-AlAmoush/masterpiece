import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";

function Wishlist() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [id, setId] = useState();
  const [wishlist, setWishlist] = useState([]);

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

  return (
    <>
      <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
        <div className="flex flex-col justify-start items-start">
          <div>
            <p className="text-sm leading-4 text-gray-600">Home</p>
          </div>
          <div className="mt-3">
            <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">Favorites</h1>
          </div>
          <div className="mt-4">
            <p className="text-2xl tracking-tight leading-6 text-gray-600">{wishlist.length} Items</p>
          </div>
          <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
            {wishlist.map((pro) => (
              <div className="flex flex-col" key={pro.id}>
                <>
                  <div className="relative">
                    <img className="hidden lg:block" src={`http://localhost:5000/${pro.photo}`} alt="bag" />
                    <button
                      aria-label="close"
                      className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 text-white hover:text-gray-400"
                    >
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
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex justify-center items-center">
                      <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800">{pro.name}</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <button
                        aria-label="show menu"
                        onClick={() => toggleShowDetails(pro.product_id)}
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 text-white hover:text-gray-400"
                      >
                        <svg
                          className={`fill-stroke ${selectedProductId == pro.product_id? "block" : "hidden"}`}
                          width={10}
                          height={6}
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 5L5 1L1 5"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <svg
                          className={`fill-stroke ${selectedProductId != pro.product_id ? "block" : "hidden"}`}
                          width={10}
                          height={6}
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    id="menu1"
                    className={`flex-col justify-start items-start mt-12 ${
                      selectedProductId === pro.product_id ? 'flex' : 'hidden'
                    }`}
                  >
                    <div className="mt-2">
                      <p className="tracking-tight text-base font-medium leading-4 text-gray-800">Description: {pro.description}</p>
                    </div>
                    <div className="mt-6">
                      <p className="tracking-tight text-base font-medium leading-4 text-gray-800">JD: {pro.price}</p>
                    </div>
                    <div className="flex justify-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                      <div className="w-full">
                        <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800 bg-white border border-gray-800">
                          More information
                        </button>
                      </div>
                      <div className="w-full">
                        <Button
                          className="border border-solid border-red-600 text-red-600 hover:bg-red-600 hover:text-[#ffffff]"
                          variant="text"
                        >
                          Add To Wishlist
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
