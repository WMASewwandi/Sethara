import React from 'react';

// --- Child Components ---

const FallingLeaves = () => {
  const leafCount = 25; // You can adjust the number of leaves here
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      {Array.from({ length: leafCount }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 8 + 7}s`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        >
          <img 
            src="/leaf.png" 
            alt="falling leaf" 
            className="animate-spin-slow"
            style={{
                width: `${Math.random() * 20 + 15}px`,
                animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

const servicesData = [
  {
    title: 'Cardiac Diseases',
    image: '/cardiac.webp',
    description: 'To address specific cardiac issues, the Doctor will recommend a combination of Ayurvedic treatments such as Sarvanga Abhyanga (full body massage) and Hrud Basti (medicated oil treatment for the heart).',
    duration: 'Depends on the condition',
    yoga: 'Yoga - included',
    meditation: 'Meditation - included',
  },
  {
    title: 'Arthritis & Orthopaedic Diseases',
    image: '/arthritiss.webp',
    description: 'To treat arthritis and other orthopaedic diseases, guests will be recommended to undergo treatment such as Sarvanga Abhyanga (full body massage) and Sweda Karma (steam bath).',
    duration: 'Depends on the condition',
    yoga: 'Yoga - Daily sessions',
    meditation: 'Meditation - Daily sessions',
  },
  {
    title: 'Liver Diseases',
    image: '/liver.webp',
    description: 'Guests with this common condition will be given a customised diet plan, and will also undergo treatments such as Virechana (purging) and special herbal pastes applied on the affected area.',
    duration: 'Depends on the condition',
    yoga: 'Yoga - Daily sessions',
    meditation: 'Meditation - Daily sessions',
  },
];

const ServiceCard = ({ service }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
    <div className="relative">
      <img src={service.image} alt={service.title} className="w-full h-56 object-cover" />
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-3 uppercase">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <ul className="text-gray-600 space-y-2 mb-6">
        <li className="flex items-center"><span className="font-bold mr-2">+</span> {service.duration}</li>
        <li className="flex items-center"><span className="font-bold mr-2">+</span> {service.yoga}</li>
        <li className="flex items-center"><span className="font-bold mr-2">+</span> {service.meditation}</li>
      </ul>
      <button className="text-gray-700 font-bold tracking-widest uppercase text-sm border-b-2 border-gray-300 pb-1 hover:border-gray-700 transition-colors duration-300">
        Read More
      </button>
    </div>
  </div>
);

const Services = () => {
  return (
    <>
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-10vh) translateX(0) rotate(0); opacity: 1; }
            100% { transform: translateY(110vh) translateX(100px) rotate(360deg); opacity: 0; }
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg) translateX(5px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(5px) rotate(-360deg); }
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
            Services at Sethara
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto mb-16">
            Experience the best Ayurveda treatments in Sri Lanka at Sethara Ayurveda. Discover our range of treatment programmes which are tailor-made to help you achieve your personal health and wellness goals. Under the careful supervision of our Ayurvedic physicians, we offer a holistic approach towards treating our guests.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
