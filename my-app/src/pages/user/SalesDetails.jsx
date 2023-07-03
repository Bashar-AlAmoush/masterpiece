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
     const [id, setId] = useState();
       const [cart, setCart] = useState([]);
        const [quantity, setQuantity] = useState(1);
  
      useEffect(() => {
    axios
      .get(`http://localhost:5000/Prod/${Product.Product_id}`)
      .then((response) => {
        setProducts(response.data);
      
        axios
          .get('http://localhost:5000/getId')
          .then(function (response) {
            setId(response.data[0].userid);
            console.log(response.data[0].userid);
            axios
            
            .get(`http://localhost:5000/getusercart/${response.data[0].userid}`)
           .then(function (response) {
             setCart(response.data);
              console.log(response.data);
            })
           .catch(function (error) {
              console.log(error);
        });
          })
          .catch(function (error) {
            console.log(error);
          });

        
      })
      .catch((error) => console.log(error.message));
  }, [Product]);

  
   const addToCart = (product) => {
    console.log(id);
    console.log(product);

    const existingProduct = cart.find((item) => item.product_id === product.product_id);

    if (existingProduct) {
      const updatedCart = cart.map((item) => {
        if (item.product_id=== product.product_id) {
            setQuantity( item.quantity + quantity)

            axios.put('http://localhost:5000/updatequa',{ 
              user_id: id,
            product_id: product.product_id,
            quantity: quantity,})
            .then((response) => {
                console.log(response.data); 

                axios
                .get(`http://localhost:5000/getusercart/${id}`)
                .then(function (response) {
                  setCart(response.data);
                  console.log(response.data);
                })
                .catch(function (error) {
                  console.log(error);
                });

                
            })
            .catch((error) => console.log(error.message))


        }
        return item;
      });
      setCart(updatedCart);
      toast.success(`Quantity of ${product.name} has been updated in your cart.`);
    } else {
      axios.post('http://localhost:5000/addsaleToCart', {
        user_id: id,
        product: product,
        quantity: quantity,
      })
      .then((response) => {
        toast.success(`${product.name} has been added to your cart.`);
        axios
        .get(`http://localhost:5000/getusercart/${id}`)
        .then(function (response) {
          setCart(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
       })
      .catch((error) => {
       console.error('Error adding to cart:', error);
      });
     
    }

   
  };



  const handleInputChange = (event) => {
    let value = event.target.value;

    if (value < 1) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    }

    setQuantity(value);
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
     
     <section className="container mx-auto py-16 px-4">
        {Products.map((product) => (
          <div className="flex flex-wrap" key={product.id}>
            <div className="w-full md:w-1/2">
              <img src={`http://localhost:5000/${Products[0]?.photo}`} alt={product.name} className="rounded-lg" />
            </div>
            <div className="w-full md:w-1/2 md:pl-10">
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              <p className="text-xl mb-4">{product.description}</p>
              <p className="text-2xl mb-4">{product.new_price}</p>
              <div className="flex items-center mb-8">
                <label htmlFor="quantity" className="mr-4">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={handleInputChange}
                  className="border border-gray-400 px-2 py-1 w-16 rounded"
                />
              </div>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded font-bold text-lg"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </section>
  </>
  
  
  
      </>
      </>
  
    )
}

export default SalesDetails