

import { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery"
import { Icon } from '@iconify/react';
import Banner from "./components/Banner";
import Footer from "./components/Footer";

function App() {


  const [scrollPosition, setScrollPosition] = useState(0);

  // Scroll to the top when the component is first loaded

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Event handler to update the scroll position as the user scrolls
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  // Attach the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>

      <div className="bg-[#F0F9FF] min-h-screen pt-5">
        <nav className="xl:w-10/12 xl:mx-auto mx-5 bg-white px-5 py-3 shadow-md rounded-full animate__animated animate__fadeInDown">
          <div className="flex items-center justify-between">
            <a href="#" className="lg:text-2xl text-xl font-bold text-[#00226D]">Kaykobad <span className="text-[#1179EF]">Yiasin</span></a>
            <img src='https://kaykobadyiasin-portfolio.web.app/assets/Kaykobad-Yiasin-Photo-1fe1ad0d.jpg' className="w-12 h-12 object-cover rounded-full" alt="" />
          </div>
        </nav>

        <Banner />
        <ImageGallery />
        {/* Add a button or element to scroll back to the top */}
        {scrollPosition > 100 && (
          <button
            className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full animate__animated animate__pulse animate__infinite	infinite animate__slow 2s"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Icon icon="pajamas:scroll-up" className="text-3xl " />
          </button>
        )}

        <hr />
        <Footer />
      </div>
    </>
  )
}

export default App
