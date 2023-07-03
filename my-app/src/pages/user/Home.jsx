import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
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

  //This useState will hold the currently selected food type.
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
    axios.post('http://localhost:5000/addTowishlist', {
      user_id: id,
      product: product,
    })
    .then((response) => {
      toast.success(`${product.name} has been added to your cart.`);
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
      <section className="relative  flex flex-col items-center justify-center text-center text-white " style={{ height: "550px" }}>
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
          <h3 className="font-bold text-2xl capitalize">Unleash your creativity with our cutting-edge art supplies  </h3>
          <div class="rounded-md shadow mt-10">
            <HashLink smooth={true} to="#food">
              <button class="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-5">
              Shop Now
              </button>
            </HashLink>
          </div>
        </div>
      </section>


      <section className="bg-white dark:bg-gray-900 shadow-lg">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
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
        <section id="food">
          <br />
          <h2 className=" text-4xl mb-8 tracking-tight font-extrabold text-black  text-center capitalize">
            What Type Of Supplier you need?
          </h2>
          <div className="flex flex-wrap mb-10 mx-20">
            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="relative rounded-lg overflow-hidden">
                {/* canvas card */}
                <img
                  className="w-full h-64 object-cover object-center"
                  src={brush}
                  alt="vegetables" />
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white uppercase lg:text-4xl">
                    Drawing
                    </h2>
                    <button
                      className="text-sm button-shop font-medium mt-4 text-white px-5 py-2.5 rounded-lg"
                      onClick={() => handleTypeSelection("drawing")}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="relative bg-gray-400 rounded-lg shadow-lg overflow-hidden">
                {/* canvas card */}
                <img
                  className="w-full h-64 object-cover object-center"
                  src={canvas}
                  alt="vegetables" />
                <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white uppercase lg:text-4xl">
                    canvas
                                        </h2>
                    <button
                      className="text-sm button-shop font-medium mt-4 text-white px-5 py-2.5 rounded-lg"
                      onClick={() => handleTypeSelection("canvas")}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="relative bg-gray-400 rounded-lg shadow-lg overflow-hidden">
                {/* chalk card */}
                <img
                  className="w-full h-64 object-cover object-center"
                  src={chalk}
                  alt="vegetables" />
                <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white uppercase lg:text-4xl">
                    paints
                    </h2>
                    <button
                      className="text-sm button-shop font-medium mt-4 text-white px-5 py-2.5 rounded-lg"
                      onClick={() => handleTypeSelection("paints")}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="relative bg-gray-400 rounded-lg shadow-lg overflow-hidden">
                {/* Italian Food card */}
                <img
                  className="w-full h-64 object-cover object-center"
                  src={Easels}
                  alt="vegetables" />
                <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white uppercase lg:text-4xl">
                    paper
                    </h2>
                    <button
                      className="text-sm button-shop font-medium mt-4 text-white px-5 py-2.5 rounded-lg"
                      onClick={() => handleTypeSelection("paper")}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="relative bg-gray-400 rounded-lg shadow-lg overflow-hidden">
                {/* Indian Food card */}
                <img
                  className="w-full h-64 object-cover object-center"
                  src={PaintPalette}
                  alt="vegetables" />
                <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white uppercase lg:text-4xl">
                    Paint Tools
                    </h2>
                    <button
                      className="text-sm button-shop font-medium mt-4 text-white px-5 py-2.5 rounded-lg"
                      onClick={() => handleTypeSelection("tools")}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="relative bg-gray-400 rounded-lg shadow-lg overflow-hidden">
                {/* American Food card */}
                <img
                  className="w-full h-64 object-cover object-center"
                  src={watercolour}
                  alt="vegetables" />
                <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-white uppercase lg:text-4xl">
                    paints
                    </h2>
                    <button
                      className="text-sm button-shop font-medium mt-4 text-white px-5 py-2.5 rounded-lg"
                      onClick={() => handleTypeSelection("paints")}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex justify-center">

          <HashLink smooth={true} to="ServicePageAll#">
            <Button className="border mb-10 border-solid border-red-600 text-red-600 hover:bg-red-600 hover:text-[#ffffff]" variant="text">
              Show All EQUIPMENT
            </Button>
          </HashLink>

        </div>
      
        <section>
        <div class="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 ">
          <header>
            <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
              latest offers
            </h2>
          </header>

          <ul class="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((pro) => (

              <li >
               
                   <img
                   src={`http://localhost:5000/${pro.photo}`}  
                    alt=""
                    class="h-[250px] rounded-3xl	 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[300px]"
                  />

                  <div class="relative pt-3 bg-white"  >
                    <h3
                      class="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4"
                    >
                     {pro.name}

                    </h3>
                    <h3
                      class="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4"
                    >
                      Description : {pro.description}

                    </h3>

                    <p class="mt-2">
                      <span class="sr-only"> Regular Price </span>

                      <span class="tracking-wider text-lg text-rose-600	 line-through">JD: {pro.price} </span>
                      <br />
                      <span class="tracking-wider text-lg text-red-600">JD: {pro.new_price}</span>
                    </p>
                    <Button className="border border-solid border-red-600 text-red-600 hover:bg-red-600 hover:text-[#ffffff] mr-4" variant="text" onClick={() => handleTypesales(pro.product_id)}>
    Buy Now
</Button>

<Button className="border border-solid border-red-600 text-red-600 hover:bg-red-600 hover:text-[#ffffff]" variant="text" onClick={() => addTowishlist(pro)}>
   Add To Wishlist
</Button>
          
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