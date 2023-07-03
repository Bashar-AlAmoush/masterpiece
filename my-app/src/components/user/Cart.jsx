// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";
// export default function Cart() {
//     const [cartData, setCartData] = useState([]);
   
//     useEffect(() => {
//         const existingCart = JSON.parse(localStorage.getItem("cart"));
//         if (existingCart) {
     
//           setCartData(JSON.parse(localStorage.getItem("cart")))
          
//         }
//       }, []);
      

      
//   const handleCountChange = (event, index) => {
//     const { value } = event.target;

//     setCartData((prevCartData) => {
//       const updatedCartData = [...prevCartData];
//       updatedCartData[index].count = value;
      
//       return updatedCartData;
//     });
//   };
// const handleRemoveProduct = (index) => {
//     const updatedCart = [...cartData];
//     const removedProduct = updatedCart.cart.cart.splice(index, 1)[0];
//     setCartData(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
  
//     toast.error(`Product "${removedProduct.name}" has been removed from the cart.`);
//   };

//   const calculateSubtotal = () => {
//     const subtotal =  cartData.cart.cart.reduce((total, product) => {
//       if(product.new_price>0){
//         return total + (product.new_price * product.count);
//       }
//       else{
//         return total + (product.price * product.count);
//       }
//     }, 0);
    
//     return parseInt(subtotal).toFixed(2);
//   };

//   const calculateTotal = () => {
//     const subtotal = parseFloat(calculateSubtotal());
//     const tax = 2;
//     localStorage.setItem('total', JSON.stringify(parseInt(subtotal+tax)));
//     return parseInt(subtotal  + tax).toFixed(2);
//   };
//   const navigate = useNavigate(); 

//   const handleCheckout = () => {
//     const auth = localStorage.getItem('auth');
//     if (auth) {
//       window.scrollTo(0, 0); // Scroll to the top of the page
//       navigate("/PaymentPage");
//     } else {
//       window.scrollTo(0, 0); // Scroll to the top of the page
//       navigate(`/signin?redirectPath=${encodeURIComponent('/Cart')}`);
//     }
//   }
//   return (
//     <>
//      <ToastContainer />
//     <div>       
//                     <div className="w-full h-full ">
//                         <div className="w-full   h-full  " >
//                             <div className="flex md:flex-row flex-col  gap-3">
//                                 <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
//                                     <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer" >
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
//                                             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                                             <polyline points="15 6 9 12 15 18" />
//                                         </svg>
//                                         <Link to="/">
//                                         <p className="text-sm pl-2 leading-none">Back</p>
//                                         </Link>
//                                     </div>
//                                     <p className="text-5xl font-black leading-10 text-red-500 pt-3">Bag</p>

//                                     {cartData && cartData.cart &&cartData.cart.cart.map((product, index) => (
                                     
                                        
//   <div className="md:flex items-center mt-14 py-8 border-t border-gray-200 shadow-lg rounded-lg" key={index}>
//     <div className="w-1/4">

   
          
//       <img src={`http://localhost:5000/${product?.photo}`} alt="" className="w-full h-full object-center object-cover" />
        

//     </div>
//     <div className="md:pl-3 md:w-3/4">
//       <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">{product.category}</p>
//       <div className="flex items-center justify-between w-full pt-1">
   
//           <p className="text-base font-black leading-none text-gray-800"> {product.name}</p>
        
        
//         <div className="relative mb-3" data-te-input-wrapper-init>
//           <input
//             type="number"
//             className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
//             id={`exampleFormControlInputNumber_${index}`}
//             placeholder="Number"
//             value={product.count}
//             onChange={(e) => handleCountChange(e, index)}
//           />
//         </div>
//       </div>
//       <p className="text-xs leading-3 text-gray-600 pt-2">{product.description}</p>
//       <div className="flex items-center justify-between pt-5 pr-6">
//         <div className="flex items-center">
//           <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={() => handleRemoveProduct(index)}>Remove</p>
//         </div>
//         {product.new_price>0 ? (
//           <p className="text-base font-black leading-none text-gray-800">JD: {product.new_price}</p>
//         ) : (
//           <p className="text-base font-black leading-none text-gray-800">JD: {product.price}</p>
//         )}
//       </div>
//     </div>
//   </div>
// ))}               
//                                 </div>
//                                 <div className="md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
//                                     <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
//                                         <div>
//                                             <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
//                                             <div className="flex items-center justify-between">
//                   <p className="text-gray-600">Subtotal:</p>
//                   <p className="text-gray-800 text-2xl font-bold"> JD:{calculateSubtotal()}</p>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <p className="text-gray-600">Tax:</p>
//                   <p className="text-gray-800 text-2xl font-bold">JD: 2.00</p>
//                 </div>
//                 <div className="flex items-center justify-between border-t border-gray-200 pt-3">
//                   <p className="text-gray-800 font-bold">Total:</p>
                                       
//                   <p className="text-red-500 font-bold text-2xl"> JD:{ calculateTotal()}</p>
//                 </div>
//                   <button className="text-base leading-none w-full py-5 bg-red-800 border-red-800 border  text-white" onClick={handleCheckout} >
//                     Checkout
//                   </button>
                                          
//                                         </div>
                                       
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
              
//             </div>

//             <style>
//                 {` /* width */
//                 #scroll::-webkit-scrollbar {
//                     width: 1px;
//                 }

//                 /* Track */
//                 #scroll::-webkit-scrollbar-track {
//                     background: #f1f1f1;
//                 }

//                 /* Handle */
//                 #scroll::-webkit-scrollbar-thumb {
//                     background: rgb(133, 132, 132);
//                 }
// `}
//             </style>
//         </>
    
    
    
   
//   )
// }


import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const [id, setId] = useState();
  const [quantity, setQuantity] = useState(1);

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

  const handleCountChange = (event, index) => {
    const { value } = event.target;

    setCartData((prevCartData) => {
      const updatedCartData = [...prevCartData];
      updatedCartData[index] = {
        ...updatedCartData[index],
        quantity: value
      };

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
      const productPrice = product.new_price > 0 ? parseFloat(product.new_price) : parseFloat(product.price);
      const productCount = parseInt(product.quantity);
      return total + productPrice * productCount;
    }, 0);
  
    return subtotal.toFixed(2);
  };
  
  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = 2;
    const total = subtotal + tax;
    localStorage.setItem('total', JSON.stringify(total));
    return total.toFixed(2);
  };
  

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
                        <div className="relative mb-3" data-te-input-wrapper-init>
                          <input
                            type="number"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id={`exampleFormControlInputNumber_${index}`}
                            placeholder="Number"
                            value={product.quantity}
                            onChange={(e) => handleCountChange(e, index)}
                          />
                        </div>
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
                      <p className="text-red-500 text-3xl font-black">JD: {calculateTotal()}</p>
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

