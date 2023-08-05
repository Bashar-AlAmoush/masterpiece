import React, { useEffect } from 'react';
import { useState } from 'react';
import Swiper from 'swiper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DrawingHome() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  function handleTypeSales(product_id) {
    window.scrollTo(0, 0);
    navigate(`/SalesDetails/${product_id}`);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/saleAll`)
      .then((response) => {
        setProducts(response.data);
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
    <section className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:me-0 lg:pe-0 lg:ps-8">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:items-center lg:gap-x-16">
          {/* Left Content */}
          <div className="max-w-xl text-center sm:text-left">
            {/* Title */}
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-800">
              Don't just take our word for it...
              <br className="hidden sm:block lg:hidden" />
              Read reviews from our customers
            </h2>
            <p className="mt-4 text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
              veritatis illo placeat harum porro optio fugit a culpa sunt id!
            </p>

            {/* Navigation Buttons */}
            <div className="mt-8 flex gap-4 lg:mt-0">
              <button
                className="prev-button rounded-full border border-pink-600 p-3 text-pink-600 hover:bg-pink-600 hover:text-white"
                onClick={goToPrevSlide}
              >
                <span className="sr-only">Previous Slide</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 rtl:rotate-180"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <button
                className="next-button rounded-full border border-pink-600 p-3 text-pink-600 hover:bg-pink-600 hover:text-white"
                onClick={goToNextSlide}
              >
                <span className="sr-only">Next Slide</span>
                <svg
                  className="h-5 w-5 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center lg:flex-row lg:col-span-2">
            {/* Testimonials */}
            <div className="swiper-container !overflow-hidden w-full">
              <div className="swiper-wrapper">
                {products.map((pro) => (
                  <div className="swiper-slide" key={pro.id}>
                    <blockquote className="flex h-full flex-col justify-between bg-white p-6 sm:p-12 border border-gray-300 shadow-md rounded-lg">
                      <div>
                        <img
                          src={`http://localhost:5000/${pro.photo}`}
                          alt={pro.name}
                          className="w-full h-64 object-cover object-center rounded-t-lg"
                        />

                        <div className="mt-4">
                          <p className="text-xl sm:text-2xl font-bold text-red-500">
                            {pro.name}
                          </p>
                          <p className="text-xl sm:text-2xl font-bold text-black">
                            {pro.description}
                          </p>
                          <p className="mt-2 text-gray-800 font-bold">JD: {pro.price}</p>
                        </div>
                      </div>
                      <footer className="mt-4 sm:mt-8 text-sm text-gray-500">&mdash; {pro.user_id}</footer>
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DrawingHome;
