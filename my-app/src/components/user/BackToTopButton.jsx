import React, { useState, useEffect } from 'react';
function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 0);
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
   <div
      className={`back-to-top-button fixed bottom-8 right-8 bg-red-500 border-2 border-white text-white w-12 h-12 rounded-full flex justify-center items-center cursor-pointer transition-opacity z-50 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
    >
      &uarr;
    </div>


  )
}

export default BackToTopButton