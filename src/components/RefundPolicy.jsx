import React from 'react';

const RefundPolicy = () => {
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
            Refund Policy
        </h1>
      </section>

      {/* Section for the main content with background image */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/slide1.webp')" }}
      >
        {/* White gradients for a soft fade effect */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-50 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto">
            <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-2xl max-w-4xl mx-auto text-left">
                <div className="space-y-8 text-gray-700">
                    <div>
                        <p className="text-lg leading-relaxed">
                            At Sethara Hela Weda Madura, we strive to provide you with a seamless and satisfying experience when booking our Ayurvedic treatments and consultations. We understand that there may be situations where cancellations or changes are necessary, and we aim to handle such matters fairly and transparently.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Refund Policy</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            Refunds are only applicable under specific conditions as outlined below:
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-lg">
                            <li><strong>Doctor Unavailability:</strong> If a scheduled Ayurvedic consultation or treatment is canceled due to the unavailability of the doctor or practitioner, we will issue a full refund to the original payment method. You may also choose to reschedule the appointment at no additional cost.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Non-Refundable Circumstances</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            Please note that no refunds will be issued in the following cases:
                        </p>
                         <ul className="list-disc list-inside mt-4 space-y-2 text-lg">
                            <li>The patient fails to attend the scheduled appointment (no-show).</li>
                            <li>The appointment is canceled by the patient with less than 24 hours’ notice.</li>
                            <li>The patient voluntarily cancels a confirmed booking for any reason unrelated to service failure on our part.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Cancellation Policy</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            If you wish to cancel or reschedule your appointment, we kindly request that you notify us at least 24 hours in advance. This allows us to manage our schedule efficiently and offer the slot to another patient in need.
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-lg">
                           <li>Cancellations made less than 24 hours before the scheduled time will not be eligible for a refund.</li>
                           <li>Rescheduling with 24+ hours' notice is allowed free of charge, subject to availability.</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Damaged or Incorrect Transactions</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            In the rare event of a technical error during payment (e.g., double payment or failed transaction with deduction), please contact our support team immediately. We will investigate the matter and initiate a refund where applicable.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Processing Time</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            If you are eligible for a refund:
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-lg">
                            <li>It will be processed within 5–7 business days.</li>
                            <li>The amount will be credited to your original method of payment.</li>
                            <li>The exact time it takes to reflect in your account may vary depending on your bank or payment provider.</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Contact Us</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            If you have any questions regarding your booking, cancellations, or refunds, please don’t hesitate to get in touch: <br/>
                            <strong>Sethara Hela Weda Madura</strong> <br/>
                            📞 Phone: 071 892 3000 <br/>
                            📧 Email: upul.pentip@gmail.com | setharahela@gmail.com <br/>
                            🌐 Website: https://setharahealth.com/

                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default RefundPolicy;
