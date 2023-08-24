import React from 'react'
import home from '../../images/home1.jpg'
import home1 from '../../images/home2.jpg'
function AboutHome() {
  return (
   <>
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
   </>
  )
}

export default AboutHome