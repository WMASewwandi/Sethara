import React from 'react';

// New component for the falling leaves animation
const FallingLeaves = () => {
  const leafCount = 30; // Adjust the number of leaves

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


const packagesData = [
  {
    duration: '3 DAYS / 45 min per day',
    title: 'Shirodhara',
    focus: 'Running fine steam of warm Ayurveda oil on the "third Eye" area of the forehead',
    bestFor: 'Individuals looking for a quick detox, mental clarity, and a reset from the stresses of daily life. Ideal for first-time Ayurvedic experiences.',
    inclusions: [
      'Doctor consultation',
      '1 treatment per day',
    ],
    images: ['/packages/7-day-1.webp', '/packages/7-day-2.webp', '/packages/7-day-3.webp'],
  },
  {
    duration: '90 Minutes',
    title: 'Chakra',
    focus: 'Release Blockages in the body’s Chakra, Restoring the Flow of Energy',
    bestFor: 'Those seeking to balance their energy centers, improve emotional well-being, and enhance spiritual growth. Suitable for both beginners and those familiar with chakra work.',
    inclusions: [
      'Initial and follow-up consultations',
      'Personalized plan',
    ],
    images: ['/packages/14-day-1.webp', '/packages/14-day-2.webp', '/packages/14-day-3.webp'],
  },
  {
    duration: 'Anytime',
    title: 'Regular Treatments',
    focus: 'Total Transformation & Long-term Wellness',
    bestFor: 'Individuals committed to ongoing health improvement, looking for regular Ayurvedic treatments to maintain balance and vitality. Perfect for those with chronic conditions or seeking preventive care.',
    inclusions: [
      'Include a variety of treatments (Can book through the website)',
     
    ],
    images: ['/packages/28-day-1.webp', '/packages/28-day-2.webp', '/packages/28-day-3.webp'],
  },
];

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const PackageCard = ({ pkg, onBookNowClick, isReversed = false }) => {
  const Details = () => (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">{pkg.duration}</h2>
      <p className="text-4xl mb-6 text-gray-200 ">{pkg.title}</p>
      
      <h3 className="text-2xl font-semibold mb-2">Focus</h3>
      <p className="text-base text-gray-300 mb-6">{pkg.focus}</p>

      <h3 className="text-2xl font-semibold mb-2">Best For</h3>
      <p className="text-base text-gray-300 mb-6">{pkg.bestFor}</p>

      <h3 className="text-2xl font-semibold mb-4">Inclusions</h3>
      <ul className="space-y-3">
        {pkg.inclusions.map((item, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={onBookNowClick}
        className="mt-8 bg-yellow-700 text-white font-bold py-3 px-8 rounded-md hover:bg-yellow-800 transition-colors">
        Book Now
      </button>
    </div>
  );

  const Images = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <img src={pkg.images[0]} alt={`${pkg.duration} package main`} className="rounded-lg shadow-lg w-full h-auto object-cover" />
      </div>
      <div>
        <img src={pkg.images[1]} alt={`${pkg.duration} package detail 1`} className="rounded-lg shadow-lg w-full h-auto object-cover" />
      </div>
      <div>
        <img src={pkg.images[2]} alt={`${pkg.duration} package detail 2`} className="rounded-lg shadow-lg w-full h-auto object-cover" />
      </div>
    </div>
  );

  return (
    <div className="relative p-8 rounded-lg shadow-2xl border border-gray-200/20 overflow-hidden">
        <img src={pkg.images[0]} alt="background" className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110" />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            {isReversed ? (
                <>
                    <Images />
                    <Details />
                </>
            ) : (
                <>
                    <Details />
                    <Images />
                </>
            )}
        </div>
    </div>
  );
};

const Packages = ({ onBookNowClick, onViewAllClick }) => {
  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=My+Soul&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Maname&family=My+Soul&display=swap');
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
      <section className="py-20 px-4 bg-gray-50 relative overflow-hidden">
        <FallingLeaves />
        <div className="container mx-auto relative z-10">
          <h1 
            className="text-6xl md:text-7xl text-gray-800 text-center mb-6"
            style={{ fontFamily: "'My Soul', cursive" }}
          >
            Wellness Packages
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
            At Sethara, each of our tailor-made treatments has been specially designed to help you achieve your goals to heal, cleanse, revitalize and transform your mind and body.
          </p>

          <div className="space-y-16">
            {packagesData.map((pkg, index) => (
              <PackageCard key={index} pkg={pkg} onBookNowClick={onBookNowClick} isReversed={index === 1} />
            ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={onViewAllClick}
              className="bg-green-700 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-green-800 transition-colors duration-300 shadow-lg"
            >
              View All Packages
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Packages;