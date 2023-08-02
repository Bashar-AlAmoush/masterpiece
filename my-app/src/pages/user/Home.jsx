import { Button } from "@material-tailwind/react";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import video from '../../images/video.mp4'
import { HashLink } from "react-router-hash-link";
import home from '../../images/home1.jpg'
import home1 from '../../images/home2.jpg'
import brush from '../../images/brush.jpg'
import canvas from '../../images/canvas.jpg'
import chalk from '../../images/chalk.jpg'
import Easels from '../../images/Easels.jpg'
import PaintPalette from '../../images/Paint Palette.jpg'
import watercolour from '../../images/watercolour.jpg'
import "pure-react-carousel/dist/react-carousel.es.css";
import axios from 'axios'
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
function Home() {
  const [category, setcategory] = useState('');
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);

  function handleTypeSelection(categoryy) {
    setcategory(category);
    window.scrollTo(0, 0)
    navigate(`/Product/${categoryy}`);
  }


  function handleTypesales(product_id) {
    window.scrollTo(0, 0)
    navigate(`/SalesDetails/${product_id}`);
  }


  const [id, setId] = useState();
  const [wishlist, setwishlist] = useState([]);

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


  return (
    <>
       <ToastContainer />
      <section className="relative  flex flex-col items-center justify-center text-center text-white " style={{ height: "550px" }}
      >
        <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
          <video
            className="min-w-full min-h-full absolute object-cover"
            src={video}
            type="video/mp4"
            autoPlay={true}
            muted={true}
            loop={true}
          />
        </div>
        <div className="video-content space-y-2 z-10 pb-5" style={{ height: "55vh" }}>
          <h1 className="font-bold text-5xl uppercase text-red-500">Welcome to Masterpiece</h1>
          <h5 className="font-bold text-2xl capitalize">Unleash your creativity with our cutting-edge art supplies  </h5>
          <div class=" mt-10">
            <HashLink smooth={true} to="#food">
              <button class="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-5">
              Shop Now
              </button>
            </HashLink>
          </div>
        </div>
      </section>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700"/>


      <section className="bg-white dark:bg-gray-900 shadow-lg mb-20">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-4 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-2 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white capitalize">
            Unleash Your Creativity
            </h2>
            <br />
            <p className="">
            Browse through our extensive catalog of art supplies handpicked for artists like you. From premium paints and brushes to top-of-the-line canvases and sketchbooks, we curate a wide range of products that meet the highest standards of quality. With just a few clicks,
             you can easily find the perfect tools to unlock your artistic potential and express yourself like never before.             </p>

          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src= {home}
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src={home1}
              alt="office content 2"
            />
          </div>
        </div>
      </section>


      <div className="bg-white mt-10 shadow-lg">
      <section id="food" className="py-16 bg-gray-100">
  <div className="container mx-auto">
    <h2 className="text-4xl mb-8 tracking-tight font-extrabold text-black text-center capitalize">
      What Type Of Supplier do you need?
    </h2>
    <div className="flex flex-wrap justify-center -mx-4">
      <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-100 transform hover:scale-105">
          <img
            className="w-full h-64 object-cover object-center rounded-t-lg"
            src={brush}
            alt="vegetables"
          />
          <div className="absolute inset-0 bg-black opacity-60 rounded-t-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl lg:text-4xl font-semibold text-white uppercase">
                Drawing
              </h2>
              <button
                className="text-sm button-shop font-medium mt-4 text-white px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300"
                onClick={() => handleTypeSelection("drawing")}
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-100 transform hover:scale-105">
          <img
            className="w-full h-64 object-cover object-center rounded-t-lg"
            src={canvas}
            alt="vegetables"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl lg:text-4xl font-semibold text-white uppercase">
                Canvas
              </h2>
              <button
                className="text-sm button-shop font-medium mt-4 text-white px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300"
                onClick={() => handleTypeSelection("canvas")}
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-100 transform hover:scale-105">
          <img
            className="w-full h-64 object-cover object-center rounded-t-lg"
            src={chalk}
            alt="vegetables"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl lg:text-4xl font-semibold text-white uppercase">
                Paints
              </h2>
              <button
                className="text-sm button-shop font-medium mt-4 text-white px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300"
                onClick={() => handleTypeSelection("paints")}
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-100 transform hover:scale-105">
          <img
            className="w-full h-64 object-cover object-center rounded-t-lg"
            src={Easels}
            alt="vegetables"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl lg:text-4xl font-semibold text-white uppercase">
                Paper
              </h2>
              <button
                className="text-sm button-shop font-medium mt-4 text-white px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300"
                onClick={() => handleTypeSelection("paper")}
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-100 transform hover:scale-105">
          <img
            className="w-full h-64 object-cover object-center rounded-t-lg"
            src={PaintPalette}
            alt="vegetables"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl lg:text-4xl font-semibold text-white uppercase">
                Paint Tools
              </h2>
              <button
                className="text-sm button-shop font-medium mt-4 text-white px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300"
                onClick={() => handleTypeSelection("tools")}
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 md:w-1/3 p-4">
        <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-100 transform hover:scale-105">
          <img
            className="w-full h-64 object-cover object-center rounded-t-lg"
            src={watercolour}
            alt="vegetables"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl lg:text-4xl font-semibold text-white uppercase">
                Watercolors
              </h2>
              <button
                className="text-sm button-shop font-medium mt-4 text-white px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300"
                onClick={() => handleTypeSelection("watercolors")}
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="flex justify-center mt-10">
    <HashLink smooth={true} to="ServicePageAll#">
      <Button className="border mb-10 border-solid border-red-600 text-red-600 hover:bg-red-600 hover:text-white" variant="text">
        Show All EQUIPMENT
      </Button>
    </HashLink>
  </div>
</section>
<hr className="w-48 h-1 mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700"/>
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
 


      </div>
          </>


  )
}

export default Home;