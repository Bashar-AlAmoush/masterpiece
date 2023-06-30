import { Link, useParams } from 'react-router-dom'
import React, { useState, useContext, useEffect } from 'react'
import { Carousel, Typography, Button } from "@material-tailwind/react";
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { HashLink } from 'react-router-hash-link'
import Details from '../../images/Details.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SalesDetails() {
    const [Products, setProducts] = useState([]);
    const  Product = useParams();
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/sales/${Product.Product_id}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => console.log(error.message));
    }, [Product]);
  
    const addToCart = (product) => {
     
      const existingCart = localStorage.getItem('cart');
    
      if (existingCart) {
   
        const cartData = JSON.parse(existingCart);
    
        
        const productIndex = cartData.findIndex((item) => item.product_id === product.product_id);
    
        if (productIndex !== -1) {
          
          cartData[productIndex].count += 1;
        } else {
         
          cartData.push({ ...product, count: 1 });
        }
    
    
        localStorage.setItem('cart', JSON.stringify(cartData));
      } else {
      
        const cartData = [{ ...product, count: 1 }];
    
        
        localStorage.setItem('cart', JSON.stringify(cartData));
      }
      toast.success(`${product.name} has been added to your cart.`);
    };
    const handleInputChange = (event) => {
      if (event.target.value > 10) {
        event.target.value = 10;
      }
    };
  
    return (
      <>
         <ToastContainer />
        <div
          className="bg-cover bg-center h-screen"
          style={{
            backgroundImage:
              `url(${Details})`,
            height: "400px",
          }}
        >
           
  
          <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Details</h1>
  
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
                  <li className="flex items-center">
                    <Link to="/" className="text-red-500">
                    EQUIPMENT
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
                  <li>Details</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <>
          <div className="relative">
            <img
              src="https://one-sourceconstruction.com/site/wp-content/uploads/c9.jpg"
              className="absolute inset-0 object-cover w-full h-full"
              alt=""
            />
          </div>
          
  
        <>
     
    <div className="relative mx-auto max-w-screen-xl px-4 py-8">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          <img
            alt="Les Paul"
            src={`http://localhost:5000/${Products[0]?.photo}`} 
            className="aspect-square w-full rounded-xl object-cover"
          />
        </div>
        <div className="sticky ">
          <div className="mt-8 flex justify-between">
            <div className="max-w-[35ch] space-y-2">
              <h1 className="text-xl font-bold sm:text-2xl">
            {  Products[0]?.name}
              </h1>
            </div>
            <p className="text-lg font-bold"> JD:{Products[0]?.new_price}</p>
          </div>
          <div className="mt-4">
            <div className="prose max-w-none">
              <p>
              {  Products[0]?.description}
              </p>
            </div>
          </div>
          <form className="mt-8">
            <div className="mt-8 flex gap-4">
            <div>
          <label htmlFor="quantity" className="sr-only">
            Qty
          </label>
          <input
            type="number"
            id="quantity"
            min={1}
            defaultValue={1}
            className="w-12 rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            onChange={handleInputChange}
          />
        </div>
  
  
              <button
    type="button" 
    className="block rounded bg-red-500 px-5 py-3 text-xs font-medium text-white hover:bg-red-700"
    onClick={() => addToCart(Products[0])} 
  >
    Add to Cart
  </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  
  
  
      </>
      </>
  
    )
}

export default SalesDetails