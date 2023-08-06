import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const [id, setId] = useState();
  const category=["Paints","paper","drawing","canvas","tools"]

  useEffect(() => {
    axios
      .get('http://localhost:5000/getId')
      .then(function (response) {
        setId(response.data[0].userid);
        console.log(response.data[0].userid);
        axios
          .get(`http://localhost:5000/getusercart/${response.data[0].userid}`)
          .then(function (response) {
            setCartData( response.data);
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [cartData]);

  const handleCountChange = async (event, productId) => {
    const { value } = event.target;
  
    setCartData((prevCartData) => {
      const updatedCartData = prevCartData.map((product) => {
        if (product.product_id === productId) {
          console.log(product);
          return { ...product, quantity: parseInt(value, 10) };
        }
        return product;
      });
  
      
      axios.post(`http://localhost:5000/countdata/${productId}`, { value: value })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
         
        });
  
      return updatedCartData;
    });
  };

  const handleRemoveProduct = (index) => {
    const updatedCart = [...cartData];
    const removedProduct = updatedCart.splice(index, 1)[0];
    setCartData(updatedCart);
    console.log(removedProduct.product_id);
  
    axios
      .delete(`http://localhost:5000/deletecartdata`, {
        data: {
          user_id: id,
          product: removedProduct
        }
      })
      .then(function (response) {
        axios
          .get(`http://localhost:5000/getusercart/${id}`)
          .then(function (response) {
            setCartData(response.data);
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  
    toast.error(`Product "${removedProduct.name}" has been removed from the cart.`);
  };
  
  const calculateSubtotal = () => {
    const subtotal = cartData.reduce((total, product) => {
      const productPrice = parseFloat(product.new_price) || parseFloat(product.price);
      const productCount = parseInt(product.quantity);
  
      if (!isNaN(productPrice) && !isNaN(productCount)) {
        return total + productPrice * productCount;
      } else {
        return total;
      }
    }, 0);
  
    return subtotal.toFixed(2);
  };
  
  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = 2;
    const total = isNaN(subtotal) ? 0 : subtotal + tax;
    localStorage.setItem('total', JSON.stringify(total));
    return total.toFixed(2);}
  

  const navigate = useNavigate();

  const handleCheckout = () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      window.scrollTo(0, 0); // Scroll to the top of the page
      navigate("/PaymentPage");
    } else {
      window.scrollTo(0, 0); // Scroll to the top of the page
      navigate(`/signin?redirectPath=${encodeURIComponent('/Cart')}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="w-full h-full">
          <div className="w-full h-full">
            <div className="flex md:flex-row flex-col gap-3">
              <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <Link to="/">
                    <p className="text-sm pl-2 leading-none">Back</p>
                  </Link>
                </div>
                <p className="text-5xl font-black leading-10 text-red-500 pt-3">Bag</p>

                {cartData.map((product, index) => (
                  <div className="md:flex items-center mt-14 py-8 border-t border-gray-200 shadow-lg rounded-lg" key={index}>
                    <div className="w-1/4">
                      <img src={`http://localhost:5000/${product?.photo}`} alt="" className="w-full h-full object-center object-cover" />
                    </div>
                    <div className="md:pl-3 md:w-3/4">
                      <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">{product.category}</p>
                      <div className="flex items-center justify-between w-full pt-1">
                        <p className="text-base font-black leading-none text-gray-800"> {product.name}</p>
                        {category.includes(product.category)  && ( <div>
    <label htmlFor="Quantity" className="sr-only">
      {" "}
      Quantity{" "}
    </label>
    <div className="flex items-center gap-1">
      <button
        type="button"
        className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
        onChange={(event) => handleCountChange(event, product.product_id)} 
      >
        −
      </button>
      <input
      min={1}
        type="number"
        id="Quantity"
        defaultValue={1}
        className="h-10 w-24 rounded border-gray-200 sm:text-sm"
        value={product.quantity}
        onChange={(event) => handleCountChange(event, product.product_id)}
      />
      <button
        type="button"
        className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
        onChange={(event) => handleCountChange(event, product.product_id)}
      >
        +
      </button>
    </div>
  </div>)}
 



                      </div>
                      <p className="text-xs leading-3 text-gray-600 pt-2">{product.description}</p>
                      <div className="flex items-center justify-between pt-5 pr-6">
                        <div className="flex items-center">
                          <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={() => handleRemoveProduct(index)}>Remove</p>
                        </div>
                        {product.new_price > 0 ? (
                          <p className="text-base font-black leading-none text-gray-800">JD: {product.new_price}</p>
                        ) : (
                          <p className="text-base font-black leading-none text-gray-800">JD: {product.price}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                  <div>
                    <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">Subtotal:</p>
                      <p className="text-gray-800 text-2xl font-bold"> JD:{calculateSubtotal()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">Tax (2%):</p>
                      <p className="text-gray-800 text-2xl font-bold"> JD:2.00</p>
                    </div>
                    <div className="flex items-center justify-between pt-6 pb-10">
                      <p className="text-gray-600 text-2xl font-black">Total:</p>
                      <p className="text-red-500 text-2xl font-black">JD: {calculateTotal()} </p>
                    </div>
                  </div>
                  <div className="pb-4">
                    <button
                      className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

