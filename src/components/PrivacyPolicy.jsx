import React from 'react';

const PrivacyPolicy = () => {
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
            Privacy Policy
        </h1>
      </section>

      {/* Section for the main content with background image */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/contact.webp')" }}
      >
        {/* White gradients for a soft fade effect */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-50 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>

        <div className="relative z-20 container mx-auto">
            <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-2xl max-w-4xl mx-auto text-left">
                <div className="space-y-8 text-gray-700">
                    <div>
                        <p className="text-lg leading-relaxed">
                            At Sethara Hela Weda Madura, your privacy is important to us. As a trusted Ayurvedic treatment center, we are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or engage with our services. By using our website, you agree to the terms outlined in this policy.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Information We Collect</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            When you interact with our website or services, we may collect the following types of personal information:
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-lg">
                            <li><strong>Personal Identification Information:</strong> Full name, email address, phone number, and home address—provided by you when booking appointments, making inquiries, or subscribing to updates.</li>
                            <li><strong>Payment Information:</strong> Payment method details (such as credit/debit card information), processed securely through trusted third-party payment gateways. We do not store your card data on our servers.</li>
                            <li><strong>Browsing and Device Information:</strong> IP address, browser type, device identifiers, and usage data automatically collected via cookies and similar tracking technologies to improve your experience.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">How We Use Your Information</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            The information we collect may be used to:
                        </p>
                         <ul className="list-disc list-inside mt-4 space-y-2 text-lg">
                            <li>Schedule and manage Ayurvedic consultations and treatments.</li>
                            <li>Process payments and send confirmations or receipts.</li>
                            <li>Provide customer support and respond to inquiries or appointment requests.</li>
                            <li>Send updates, reminders, or promotional offers relevant to your interests (you may opt out at any time).</li>
                            <li>Analyze website usage to improve our services and website functionality.</li>
                            <li>Ensure safety, prevent fraud, and comply with legal obligations.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Information Sharing</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            We value your privacy and do not sell or rent your personal information. We may share your information only under the following circumstances:
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-lg">
                           <li><strong>Service Providers:</strong> With trusted third-party partners (such as payment processors or booking platforms) who help us operate our website and deliver services. These providers are contractually bound to protect your data.</li>
                           <li><strong>Legal Compliance:</strong> If required by law, regulation, legal process, or government request, we may disclose your information to comply with legal obligations.</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Data Security</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            We take appropriate administrative, technical, and physical security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. While we strive to use commercially acceptable means to protect your information, no system can be guaranteed 100% secure.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Cookies & Tracking Technologies</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            Our website uses cookies and similar technologies to enhance your browsing experience, remember user preferences, and monitor website traffic and usage. You may adjust your browser settings to refuse cookies; however, this may affect the functionality of certain features on our website.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Your Rights</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            You have the right to access, update, or delete your personal information, opt out of promotional communications, and withdraw consent where processing is based on consent. To exercise these rights, please contact us using the information below.
                        </p>
                    </div>
                    
                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Changes to This Privacy Policy</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            We may update this Privacy Policy from time to time. When we do, we will revise the “Effective Date” at the top of the page. Please check back periodically to stay informed of how we protect your information.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-400/50 pb-2 inline-block">Contact Us</h2>
                        <p className="text-lg leading-relaxed mt-4">
                            If you have any questions or concerns about this Privacy Policy or how we handle your personal data, please contact: <br/>
                            <strong>Sethara Hela Weda Madura</strong> <br/>
                            No 506/7, Jaya Mawatha, Thalahena, Malabe, Sri Lanka <br/>
                            📞 Phone: 071 892 3000 <br/>
                            📧 Email: upul.pentip@gmail.com | setharahela@gmail.com  <br/>
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

export default PrivacyPolicy;
