import React from 'react';
// New component for the falling leaves animation
const FallingLeaves = () => {
  const leafCount = 15; // Adjust the number of leaves

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      {Array.from({ length: leafCount }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}vw`, // Random horizontal start
            animationDuration: `${Math.random() * 5 + 5}s`, // Random duration
            animationDelay: `${Math.random() * 5}s`, // Random delay
          }}
        >
          <img 
            src="/leaf.png" 
            alt="falling leaf" 
            className="animate-spin-slow"
            style={{
                width: `${Math.random() * 20 + 15}px`, // Random size
                animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
};
// A simple icon component for the top of the section
const WelcomeIcon = () => (
  <div className="mb-6">
    <svg className="w-12 h-12 text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
  </div>
);

const Welcome = () => (
  <>
    {/* This style tag imports the Google Font and defines the animation. */}
    <style>
      {`
        @import url('https://fonts.googleapis.com/css2?family=My+Soul&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Maname&family=My+Soul&display=swap');
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slowZoom 15s infinite alternate ease-in-out;
        }
          @keyframes fall {
        0% {
          transform: translateY(-10vh) translateX(0) rotate(0);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) translateX(100px) rotate(360deg);
          opacity: 0;
        }
      }
      @keyframes spin-slow {
        0% {
          transform: rotate(0deg) translateX(5px) rotate(0deg);
        }
        100% {
          transform: rotate(360deg) translateX(5px) rotate(-360deg);
        }
      }
      .animate-fall {
        animation-name: fall;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      .animate-spin-slow {
        animation-name: spin-slow;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }
      `}
    </style>
    <section className="relative py-20 px-4 overflow-hidden mt-20">
      {/* Background Image with Animation */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center animate-slow-zoom z-0"
        style={{ backgroundImage: "url('/welcome.webp')" }}
      >
      </div>
      
      {/* Top and Bottom White Gradients */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white via-white/80 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>

      {/* Content container */}
      <div className="relative container mx-auto z-20 flex justify-center items-center min-h-[60vh]">
        
        {/* Centered Text Content in a semi-transparent Card */}
        <div className="text-center bg-white/50 backdrop-blur-sm p-12 rounded-lg shadow-2xl max-w-3xl">
          <WelcomeIcon />

          <h3 
            className="text-5xl font-semibold tracking-widest text-gray-700 mb-4" 
            style={{ fontFamily: "'Maname', sans-serif" }}
          >
            ආයුබෝවන්!
          </h3>

          <h2 
            className="text-6xl md:text-7xl mb-6 text-gray-800" 
            style={{ fontFamily: "'My Soul', cursive" }}
          >
            Welcome to Sethara
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-10 font-serif max-w-xl mx-auto">
            At Sethara Hela Weda Madura, we invite you to experience the timeless healing traditions of Sri Lanka. Our sanctuary is dedicated to restoring your natural balance through authentic Ayurvedic and Hela Wedakama practices, guided by practitioners who honor the ancient wisdom passed down through generations.
          </p>

          <button className="text-gray-800 font-bold tracking-widest uppercase text-sm border-b-2 border-gray-400 pb-1 hover:border-gray-800 transition-colors duration-300">
            Learn More About Us
          </button>
        </div>

      </div>
    </section>
  </>
);

export default Welcome;