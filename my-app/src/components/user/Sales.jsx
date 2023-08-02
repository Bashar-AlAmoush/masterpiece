import React, { useEffect } from 'react'
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import {  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios'

function Sales() {


    const [products, setproducts] = useState([]);

    const [id, setId] = useState();
    const [wishlist, setwishlist] = useState([]);


    const navigate = useNavigate();
  function handleTypesales(product_id) {
    window.scrollTo(0, 0)
    navigate(`/SalesDetails/${product_id}`);
  }



  const addTowishlist = (product) => {
    console.log(id);
    console.log(product);
  
    const existingProduct = wishlist.find((item) => item.product_id === product.product_id);
  
    if (existingProduct) {
      const updatedCart = wishlist.map((item) => {
        if (item.product_id=== product.product_id) {
          toast.success(`Product "${item.name}" has been add from the wishlist.`);
                axios
                .get(`http://localhost:5000/getusercart/${id}`)
                .then(function (response) {
                  setwishlist(response.data);
                  console.log(response.data);
                
                })
                .catch(function (error) {
                  console.log(error);
                });
        }
        return item;
      });
      setwishlist(updatedCart);
    } else {
      toast.success(`${product.name} has been added to your wishlist`);
      axios.post('http://localhost:5000/addTowishlist', {
        user_id: id,
        product: product,
      })  
      
      .then((response) => {
     
        axios
        .get(`http://localhost:5000/getusercart/${id}`)
        .then(function (response) {
          setwishlist(response.data);
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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/saleAll`)
      .then((response) => {
        setproducts(response.data); 
      
        axios
          .get('http://localhost:5000/getId')
          .then(function (response) {
            setId(response.data[0].userid);
            console.log(response.data[0].userid);
            axios
            
            .get(`http://localhost:5000/getuserwishlist/${response.data[0].userid}`)
           .then(function (response) {
            setwishlist(response.data);
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
  }, []);
  return (
    <>
    <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
  <header className="text-center mb-8">
    <h2 className="text-4xl font-extrabold text-black capitalize">Latest Offers</h2>
  </header>

  <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
    {products.map((pro) => (
      <li key={pro.product_id} className="rounded-lg overflow-hidden shadow-md bg-white w-full">
        <img
          src={`http://localhost:5000/${pro.photo}`}
          alt={pro.name}
          className="h-[250px] sm:h-[300px] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 h-12 overflow-hidden">{pro.name}</h3>
          <p className="text-sm text-gray-600 mb-2 h-20 overflow-hidden">{pro.description}</p>

          <div className="flex items-center mb-2">
            <span className="text-rose-600 line-through font-semibold mr-2">JD: {pro.price}</span>
            <span className="text-red-600 font-semibold">JD: {pro.new_price}</span>
          </div>

          <div className="space-x-2 flex flex-wrap">
            <Button
              className="border border-solid border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded w-24"
              variant="text"
              onClick={() => handleTypesales(pro.product_id)}
            >
              Buy Now
            </Button>

            <Button
              className="border border-solid border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded w-24"
              variant="text"
              onClick={() => addTowishlist(pro)}
            >
              Add To Wishlist
            </Button>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>





      
      </section>
    
    
    </>
  )
}

export default Sales