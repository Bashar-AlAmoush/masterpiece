import React, { useEffect } from 'react';
import { useState } from 'react';
import Swiper from 'swiper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DrawingHome() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  function handleTypeSales(product_id) {
    window.scrollTo(0, 0);
    navigate(`/Details/${product_id}`);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/DrawingAllHome`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/ALLusers`)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data)
      })
      .catch((error) => console.log(error.message));
  }, []);


  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.next-button',
        prevEl: '.prev-button',
      },
    });
  }, []);

  const goToPrevSlide = () => {
    const swiper = document.querySelector('.swiper-container').swiper;
    swiper.slidePrev();
  };

  const goToNextSlide = () => {
    const swiper = document.querySelector('.swiper-container').swiper;
    swiper.slideNext();
  };

  return (
    <>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n  .swiper-pagination {\n    bottom: 0;\n    position: relative;\n  }\n\n  .swiper-container {\n    overflow: hidden;\n  }\n  .swiper-pagination-bullet{\n    background-color:rgb(14 211 207);\n  }\n  .swiper-pagination-bullet-active{\n    background-color:rgb(14 211 207);\n  }\n"
          }}
        />


        <div className=" bg-gray-100 " >

          <div>
            <div className="min-h-screen flex justify-center">
              <div className="grid grid-cols-2 gap-4 items-center z-10">
                <div className="max-w-lg text-center ms-3 sm:text-left">
                <h2 className="text-4xl font-bold text-black tracking-tight">
  Explore User Drawings<br className="hidden sm:block lg:hidden" /> and Unleash Creativity
</h2>
<p className="mt-4 text-black">
  Discover a collection of unique and imaginative drawings created by talented users.
</p>

                 
                  <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={goToPrevSlide}
                >
                   <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5 rtl:rotate-180"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={goToNextSlide}
                >
                 <svg
              class="h-5 w-5 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg> 
                </button>
              </div>
                </div>
                
                <div className="mx-0 max-w-xl flex items-center me-3 rounded-2xl">
                  <div className="swiper-container flex-col flex  self-center">
                    <div className="swiper-wrapper">
                      {products.map((pro,index) => (
                        <div key={index}  className="swiper-slide">
                  <blockquote className="text-left bg-gray-800 rounded-lg p-5 lg:w-10/12 lg:h-5/6" >
                            <div className="relative h-60 sm:h-72 md:h-80">
                              <div className="relative h-full">
                                <img
                                  src={`http://localhost:5000/${pro.photo}`}
                                  alt={pro.name}
                                  className="object-cover w-full h-full mx-auto rounded-t-2xl"
                                />
                                <div className="rounded-t-2xl absolute bg-gradient-to-t from-gray-800 opacity-75 inset-0 z-0" />
                              </div>
                            </div>

                            <div className="relative p-5">
                              <p className="text-gray-100 text-xl">{pro.name}</p>
                              <div className="text-sm mt-3">
                                <p className="font-medium text-white">{pro.description}</p>
                                <p className="mt-1 text-gray-300">JD: {pro.price}</p>
                                <p  className="mt-1 text-gray-300"> By  :{users?.find(user=> user.userid === pro.user_id)?.username}</p>


                                <button
                          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                          onClick={() => handleTypeSales(pro.product_id)}
                        >
                          Buy Now
                        </button>
                              </div>
                            </div>
                          </blockquote>
                        </div>



                      ))}


                    </div>
                    <div className="mt-12 swiper-pagination hidden" />
             
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
     
    </>
  );
}

export default DrawingHome;
