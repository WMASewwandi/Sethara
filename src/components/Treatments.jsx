import React, { useState, useEffect, useRef } from 'react';

// Custom hook to detect when an element is in the viewport
const useInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
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

  return [ref, isInView];
};



// Card component for a single treatment
const TreatmentCard = ({ treatment, onInView, isActive, startAnimation }) => {
    const [cardRef, isInView] = useInView({ threshold: 0.9 });
    

    useEffect(() => {
        if (isInView) {
            onInView();
        }
    }, [isInView, onInView]);

    return (
        <div ref={cardRef} className={`bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-green-200/50 group border-t-4 ${isActive ? 'border-green-500' : 'border-transparent'}`}>
            <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-gray-800">{treatment.name}</h3>
            <p className="text-gray-600 leading-relaxed min-h-[140px]">{treatment.description}</p>
            <button className="mt-6 text-gray-500 font-bold tracking-widest uppercase text-sm border-b-2 border-gray-300 pb-1 
                               self-start group-hover:text-green-600 group-hover:border-green-500 transition-colors duration-300">
                Read More
            </button>
        </div>
    );
};


const Treatments = () => {
  const treatments = [
  {
    name: 'Skin Care',
    image: '/skin-care.webp',
    description:
      'Experience radiant skin through our holistic Ayurvedic skin care therapies. These treatments use natural herbs, oils, and rejuvenating techniques to deeply cleanse, nourish, and balance your skin. Whether you’re dealing with acne, dryness, pigmentation, or premature aging, we offer personalized solutions that restore your skin’s natural glow from within.'
  },
  {
    name: 'Foot Care',
    image: '/foot-care.webp',
    description:
      'Your feet carry you through life—give them the care they deserve. Our Ayurvedic foot care therapies blend ancient massage techniques with healing herbal oils to relieve stress, stimulate nerve endings, improve circulation, and treat issues like cracks, pain, and swelling. Walk away feeling grounded, refreshed, and balanced.'
  },
  {
    name: 'Arthritis',
    image: '/arthritis.webp',
    description:
      'Ease arthritic pain and inflammation through a holistic treatment plan rooted in Ayurvedic wisdom. Using medicated oils, herbal compresses, detoxifying therapies, and gentle therapeutic exercises, we target stiffness and swelling in the joints, helping to restore mobility, comfort, and quality of life.'
  },
  {
    name: 'Diabetes',
    image: '/diabetes.webp',
    description:
      'Manage diabetes the natural way with Ayurveda. Our approach focuses on regulating blood sugar levels using powerful herbs, dietary adjustments, detoxification therapies, and lifestyle practices that support pancreatic function, improve insulin sensitivity, and enhance overall vitality—without harsh side effects.'
  },
  {
    name: 'Weight Gain',
    image: '/weight-gain.webp',
    description:
      'Struggling to gain healthy weight? Our Ayurvedic weight gain programs aim to build your body naturally by boosting digestive fire, improving nutrient absorption, and balancing metabolism. We combine personalized herbal formulas, nourishing diets, and restorative therapies to help you gain weight sustainably and healthfully.'
  },
  {
    name: 'Weight Loss',
    image: '/weight-loss.webp',
    description:
      'Achieve your ideal weight naturally and mindfully. Our Ayurvedic weight loss programs incorporate detoxification, metabolism-enhancing herbs, dietary guidance, and stress management techniques. We focus on long-term wellness, not quick fixes—helping you shed extra weight while rejuvenating your energy and confidence.'
  },
  {
    name: 'Joint Pain',
    image: '/joint-pain.webp',
    description:
      'Relieve joint stiffness and discomfort through targeted Ayurvedic care. Our treatments include warm herbal oil massages, steam therapies, and anti-inflammatory herbs designed to ease pain, improve joint flexibility, and support tissue regeneration—allowing you to move more freely and live more fully.'
  },
  {
    name: 'Paralysis',
    image: '/paralysis.webp',
    description:
      'Our paralysis care program is crafted to support nerve rejuvenation and muscle function through specialized Ayurvedic therapies. These include medicated oil massages (Abhyanga), Panchakarma detox, and physical therapies aimed at restoring movement, reducing stiffness, and improving quality of life over time.'
  }
];

  const [activeTreatmentIndex, setActiveTreatmentIndex] = useState(0);
  const [sectionRef, isSectionInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <>
    <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=My+Soul&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Maname&family=My+Soul&display=swap');
        }
        `}
        </style>
      {/* Section for the main title */}
      <section className="py-16 bg-gray-50 text-center">
        <h1 
            className="text-6xl md:text-7xl text-gray-800"
            style={{ fontFamily: "'My Soul', cursive" }}
        >
          Our Treatments
        </h1>
      </section>

      {/* Section for the main content with background image */}
      <section 
        ref={sectionRef}
        className="relative py-20 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/treatback.webp')" }}
      >
        {/* White gradients for a soft fade effect */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-50 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Image Slideshow (Hidden on mobile) */}
            <div className="hidden md:block sticky top-24">
              <div className="relative w-full h-[70vh] rounded-lg shadow-2xl overflow-hidden">
                {treatments.map((treatment, index) => (
                  <img
                    key={treatment.name}
                    src={treatment.image}
                    alt={treatment.name}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${activeTreatmentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Scrollable Treatment Cards */}
            <div className="space-y-8">
              {treatments.map((treatment, index) => (
                  <TreatmentCard 
                    key={index} 
                    treatment={treatment} 
                    onInView={() => setActiveTreatmentIndex(index)}
                    isActive={activeTreatmentIndex === index}
                    startAnimation={isSectionInView}
                  />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Treatments;