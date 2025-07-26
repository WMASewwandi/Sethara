import React from 'react';

const AboutUs = () => {
  // Array of 10 images for the marquee
  const marqueeImages = Array.from({ length: 10 }, (_, i) => `/marquee/${i + 1}.webp`);
  // Duplicate the array for a seamless loop effect
  const loopedImages = [...marqueeImages, ...marqueeImages];

  return (
    <>
      {/* CSS for the marquee animation */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=My+Soul&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Maname&family=My+Soul&display=swap');
          @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 60s linear infinite;
          }
        `}
      </style>
      
      {/* Section for the main title */}
      <section className="py-16 bg-gray-50 text-center">
        <h1 
            className="text-6xl md:text-8xl text-gray-800"
            style={{ fontFamily: "'My Soul', cursive" }}
          >
            About Sethara
        </h1>
      </section>

      {/* Section for the main content with background image */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/about.webp')" }}
      >
        {/* White gradients for a soft fade effect */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-50 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto text-center">
          {/* Our Mission */}
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
              At the heart of our journey lies a deep reverence for the ancient healing traditions of Ayurveda and Hela Wedakama—systems rooted in centuries of wisdom, harmony, and a profound understanding of the human body, mind, and spirit. Our mission is to revive and share these timeless practices with the modern world, offering a bridge between ancient knowledge and contemporary wellness.<br /><br />

We are passionately dedicated to delivering authentic, individualized care that goes beyond temporary relief. Our treatments are thoughtfully designed to uncover and address the root causes of physical and emotional imbalances rather than merely alleviating symptoms. Every healing journey we guide is unique, reflecting the distinct constitution and life journey of each person.

Our vision is to create a sanctuary of healing and peace, where guests are invited to retreat from the chaos of everyday life and rediscover their natural state of equilibrium. Within this tranquil space, we nurture holistic well-being—restoring vitality, enhancing mental clarity, and deepening the connection to one’s true self.<br /><br />

We believe that true healing begins when mind, body, and spirit are treated as one. Through our commitment to purity, compassion, and the power of traditional healing, we aim to empower individuals to lead healthier, more conscious lives, aligned with nature and guided by wisdom passed down through generations.
            </p>
          </div>

          {/* Image Marquee */}
          <div className="w-full overflow-hidden mb-16">
            <div className="flex w-max animate-scroll">
              {loopedImages.map((src, index) => (
                <img 
                  key={index} 
                  src={src} 
                  alt={`Marquee Image ${index + 1}`}
                  className="w-110 h-78 object-cover rounded-lg shadow-lg mx-2"
                />
              ))}
            </div>
          </div>

          {/* Our Story */}
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-2xl max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Our Story</h2>
            <p className="text-gray-700 leading-relaxed text-lg mt-4">
             Sethara Hela Weda Madura was born from a deep-rooted passion for Sri Lanka’s treasured legacy of indigenous healing. Inspired by centuries of Ayurvedic wisdom and the sacred practices of Hela medicine, our center was founded by dedicated practitioners who inherited this profound knowledge through generations. What began as a modest village clinic with a mission to preserve and protect these ancient traditions has now blossomed into a respected wellness retreat—welcoming guests from near and far.<br /><br />

Despite our growth, our values remain deeply grounded in compassion, authenticity, and respect for natural healing. At Sethara, we believe true wellness arises from harmony between mind, body, and spirit. Every treatment we offer is thoughtfully designed to reflect this philosophy, blending herbal remedies, traditional therapies, and personalized care.<br /><br />

Whether you seek relief from chronic ailments, rejuvenation of the body, or simply a deeper connection to your inner self, we are here to guide you on your unique journey. At Sethara Hela Weda Madura, you don’t just experience healing—you rediscover your natural vitality, rooted in the timeless wisdom of Sri Lanka’s healing heritage<br /><br />
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;