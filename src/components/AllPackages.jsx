import React, { useState, useEffect, useRef } from 'react';
import BASE_URL from '../../Base/api';

// --- Reusable Hook ---
const useInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [packages, setPackages] = useState([]);

  const fetchPackages = async () => {
    try {
      const query = `${BASE_URL}/Package/GetAll`;
      const response = await fetch(query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch items");

      const data = await response.json();
      setPackages(data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isInView, packages];
};

const allPackagesData = [
  { name: 'Head Massage', image: '/all-packages/1.webp', description1: 'A soothing therapy that uses warm herbal oils to nourish the scalp, relieve stress, and improve blood circulation.', description2: 'It promotes deep relaxation, enhances mental clarity, and supports healthy hair growth through ancient Ayurvedic techniques.', duration: '30 Min' },
  { name: 'Herbal Facial Treatment', image: '/all-packages/2.webp', description1: 'A natural skincare therapy using Ayurvedic herbs and plant-based ingredients to cleanse, exfoliate, and rejuvenate the skin.', description2: 'It helps reduce acne, pigmentation, and signs of aging while restoring a healthy, radiant glow.', duration: '60 Min' },
  { name: 'Neck & Shoulder Massage', image: '/all-packages/3.webp', description1: 'A relaxing treatment that focuses on relieving tension and stiffness in the neck and shoulder areas.', description2: 'It helps reduce stress, improve posture, and ease muscle pain caused by poor ergonomics or daily strain.', duration: '45 Min' },
  { name: 'Leg Massage', image: '/all-packages/4.webp', description1: 'A revitalizing therapy that improves blood circulation, eases muscle fatigue, and reduces swelling in the legs.', description2: 'It promotes relaxation, relieves pain, and supports joint and muscle health.', duration: '45 Min' },
  { name: 'Foot Massage', image: '/all-packages/5.webp', description1: 'A calming Ayurvedic therapy that stimulates pressure points on the feet to enhance overall well-being.', description2: 'Reduces stress, relieves foot pain and fatigue, and promotes deep relaxation using warm herbal oils and gentle techniques.', duration: '60 Min' },
  { name: 'Full Body Massage', image: '/all-packages/6.webp', description1: 'A deeply rejuvenating Ayurvedic therapy that uses warm herbal oils and rhythmic strokes to relax the entire body.', description2: 'Releases stress, improves circulation, detoxifies the system, and restores balance to mind, body, and spirit.', duration: '90 Min' },
  { name: 'Herbal Steam Bath', image: '/all-packages/7.webp', description1: 'A cleansing Ayurvedic therapy where steam infused with medicinal herbs opens up pores, promotes sweating, and eliminates toxins.', description2: 'It relaxes muscles, improves skin tone, enhances circulation, and supports respiratory and immune health.', duration: '25 Min' },
  { name: 'Shirovasti', image: '/all-packages/8.webp', description1: 'A specialized Ayurvedic therapy where warm medicated oil is held on the head using a leather cap for a specific duration.', description2: 'Helps relieve stress, insomnia, migraines, and neurological disorders while promoting mental clarity and calmness.', duration: '45 Min' },
  { name: 'Shirodhara', image: '/all-packages/9.webp', description1: 'A deeply calming Ayurvedic treatment in which a steady stream of warm herbal oil is gently poured over the forehead (third eye area).', description2: 'It soothes the nervous system, reduces stress, anxiety, insomnia, and enhances mental clarity, emotional balance, and inner peace.', duration: '45 Min (Per Day) / 3 Day Package' },
  { name: 'Chakra', image: '/all-packages/10.webp', description1: 'An Ayurvedic energy healing technique focused on balancing the body\'s seven main energy centers (chakras).', description2: 'It helps release blockages, restore emotional and physical harmony, and enhance spiritual well-being.', duration: '90 Min' },
  { name: 'Kativasti', image: '/all-packages/11.webp', description1: 'An Ayurvedic therapy that involves pooling warm medicated oil on the lower back using a specially shaped dough ring.', description2: 'It helps relieve chronic back pain, stiffness, sciatica, and muscular tension.', duration: '30 Min' },
  { name: 'Urovasti', image: '/all-packages/12.webp', description1: 'An Ayurvedic treatment where warm medicated oil is retained on the chest area using a dough dam for a set period.', description2: 'It helps relieve respiratory issues, chest stiffness, and muscle tension.', duration: '25 Min' }
];

// --- Card Component ---
const AllPackageCard = ({ pkg, startAnimation, delay, onBookNowClick }) => {
  return (
    <div
      className={`transition-all duration-700 ease-out ${startAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden h-full flex flex-col group transform hover:-translate-y-2 transition-transform duration-300">
        <div className="relative h-56">
          <img src={pkg.imageURL != "" ? pkg.imageURL : `/all-packages/10.webp`} alt={pkg.packageName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.packageName}</h3>
          <p className="text-gray-600 text-sm mb-1">{pkg.description}</p>
          {/* <p className="text-gray-600 text-sm flex-grow">{pkg.description2}</p> */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-semibold text-gray-500">{pkg.duration}</span>
            {/* <span className="text-lg font-bold text-green-600">{pkg.rate}</span> */}
          </div>
          <button
            onClick={onBookNowClick}
            className="mt-4 w-full bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const AllPackages = ({ onBookNowClick }) => {
  const [sectionRef, isSectionInView, packages] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=My+Soul&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Maname&family=My+Soul&display=swap');

        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }

        .animate-slow-zoom {
          animation: slowZoom 20s infinite alternate ease-in-out;
        }
        `}
      </style>

      <section className="relative py-20 px-4 bg-gray-100 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom z-0 opacity-50"
          style={{ backgroundImage: "url('/pacbac.webp')" }}
        ></div>

        {/* Top and Bottom Gradients */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-100 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-100 to-transparent z-10"></div>

        <div ref={sectionRef} className="relative z-20 container mx-auto">
          <h1
            className="text-6xl md:text-7xl text-gray-800 text-center mb-16"
            style={{ fontFamily: "'My Soul', cursive" }}
          >
            All Packages
          </h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <AllPackageCard
                key={index}
                pkg={pkg}
                startAnimation={isSectionInView}
                delay={index * 100}
                onBookNowClick={onBookNowClick}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllPackages;
