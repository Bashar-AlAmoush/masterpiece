import React from 'react'
import brush from '../../images/brush.jpg'
import canvas from '../../images/canvas.jpg'
import chalk from '../../images/chalk.jpg'
import Easels from '../../images/Easels.jpg'
import PaintPalette from '../../images/Paint Palette.jpg'
import watercolour from '../../images/watercolour.jpg'
import { HashLink } from "react-router-hash-link";
import { Button } from "@material-tailwind/react";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
function CategoryHome() {
    const navigate = useNavigate();
    const [category, setcategory] = useState('');
    function handleTypeSelection(categoryy) {
        setcategory(category);
        window.scrollTo(0, 0)
        navigate(`/Product/${categoryy}`);
      }

  return (
    <>
    
    <section id="product" className="py-16 bg-gray-100">
  <div className="container mx-auto">
    <h2 className="text-4xl mb-8 tracking-tight font-extrabold text-black text-center capitalize">
      What Type Of Supplier do you need?
    </h2>
    <div className="flex flex-wrap justify-center mx-4">
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


    
    </>
  )
}

export default CategoryHome