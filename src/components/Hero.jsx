import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: '/slide1.webp',
    title: 'Discover The Wonders',
    subtitle: 'Of Ayurveda and Hela Wedakama',
  },
  {
    image: '/slide2.webp',
    title: 'Holistic Healing',
    subtitle: 'Balancing Mind, Body, and Spirit',
  },
  {
    image: '/slide3.webp',
    title: 'A Journey to Wellness',
    subtitle: 'Embrace Traditional Therapies',
  },
  {
    image: '/slide4.webp',
    title: 'Natural Remedies',
    subtitle: 'Harnessing the Power of Nature',
  },
  {
    image: '/slide5.webp',
    title: 'Ancient Wisdom',
    subtitle: 'For Modern Ailments',
  },
 
];

const Hero = ({ onAppointmentClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* We define the animation keyframes here directly for simplicity */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
      <main className="relative w-full h-screen overflow-hidden">
        {/* Slideshow Images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-0' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={`Slide ${index + 1}`} 
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-in-out ${
                index === currentSlide ? 'scale-110' : 'scale-100' // Ken Burns effect
              }`} 
            />
         
            <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div> {/* Overlay */}
          </div>
        ))}

        {/* Text Content - keyed to re-trigger animation on slide change */}
        <div 
          key={currentSlide} 
          className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center p-4 animate-fadeInUp"
        >
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mt-4">
            {slides[currentSlide].subtitle}
          </p>
          <button 
            onClick={onAppointmentClick}
            className="mt-8 border-2 border-green-300 text-white font-bold py-3 px-10 rounded-full text-lg uppercase tracking-widest
                       transition-all duration-300 hover:bg-white hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Book Now
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            ></button>
          ))}
        </div>
      </main>
    </>
  );
};

export default Hero;