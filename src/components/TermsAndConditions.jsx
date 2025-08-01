import React from 'react';

const TermsAndConditions = () => {
  return (
    <>
      <style>
        {`
          /* This ensures the fonts are available on this page */
          @import url('https://fonts.googleapis.com/css2?family=My+Soul&display=swap');
        `}
      </style>
      {/* Section for the main title */}
      <section className="py-16 bg-gray-50 text-center">
        <h1 
            className="text-6xl md:text-8xl font-bold text-gray-800"
            style={{ fontFamily: "'My Soul', cursive" }}
          >
            Terms & Conditions
        </h1>
      </section>

      {/* Section for the main content with background image */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/slide4.webp')" }}
      >
        {/* White gradients for a soft fade effect */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-50 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto">
            <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-2xl max-w-4xl mx-auto text-left">
                <div className="space-y-8 text-gray-700">
                    <div>
                        <p className="text-lg leading-relaxed">
                            Welcome to Sethara Hela Weda Madura. These Terms and Conditions govern your access to and use of our website, as well as the booking and delivery of Ayurvedic consultation and treatment services. By accessing or using our website, you agree to be bound by these terms. If you do not agree, please refrain from using our services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">1. Eligibility and Use of Website</h2>
                        <ul className="list-decimal list-inside mt-4 space-y-2 text-lg">
                            <li>You must be at least 18 years old to book appointments or access services via our website.</li>
                            <li>You are responsible for maintaining the confidentiality of your account details, including any usernames or passwords.</li>
                            <li>You agree to provide accurate, complete, and current information during registration or while making a booking.</li>
                            <li>You agree not to misuse our website for unlawful, harmful, or unauthorized purposes.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">2. Appointment Bookings and Payments</h2>
                         <ul className="list-decimal list-inside mt-4 space-y-2 text-lg">
                            <li>By booking a consultation or treatment, you are entering into an agreement to receive professional Ayurvedic services at the scheduled time.</li>
                            <li>Full or partial payment may be required at the time of booking, depending on the service.</li>
                            <li>Payments are handled through secure third-party payment gateways. We do not store or have access to your full payment details.</li>
                            <li>We reserve the right to decline or cancel any booking due to availability issues, suspected fraudulent activity, or incorrect pricing information.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">4. Cancellations and Refunds</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            Our Refund & Cancellation Policy governs all cancellation and refund requests. Refunds are only issued in the event of practitioner unavailability after a confirmed booking. Cancellations made by patients with less than 24 hours’ notice will not be eligible for a refund or rescheduling. Please refer to the full [Refund and Cancellation Policy] for more details.
                        </p>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">5. Health Disclaimer</h2>
                        <ul className="list-decimal list-inside mt-4 space-y-2 text-lg">
                            <li>All consultations and treatments provided by Sethara Hela Weda Madura are based on traditional Ayurvedic practices and are not a substitute for professional medical diagnosis or emergency care.</li>
                            <li>You are responsible for disclosing any medical conditions, allergies, or medications to the practitioner prior to the consultation.</li>
                            <li>We do not guarantee specific outcomes, as each individual's condition and response to treatment may vary.</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">10. Contact Us</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            If you have any questions or concerns about these Terms and Conditions, please contact us: <br/>
                            <strong>Sethara Hela Weda Madura</strong> <br/>
                            📞 Phone: 075 315 5777 <br/>
                            📧 Email: [Insert official email] <br/>
                            🌐 Website: [Insert URL]
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;