import React from 'react';
import { WhatsAppIcon, FacebookIcon, TikTokIcon, YouTubeIcon, MailIcon } from './Icons';

const ContactUs = () => {
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
                    Contact Us
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

                <div className="relative z-20 container mx-auto grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Contact Details */}
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl text-gray-800">
                        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            We're here to help and answer any question you might have. We look forward to hearing from you.
                        </p>
                        <div className="space-y-4">
                            <p className="text-lg"><strong>Address:</strong> No 506/7 Thalahena Rd, Battaramulla 10115</p>
                            <p className="text-lg"><strong>Phone:</strong> +94 11 234 5678</p>
                            <p className="text-lg"><strong>Email:</strong> contact@sethara.lk</p>
                        </div>
                        <div className="mt-8 flex space-x-6">
                            <a href="#" className="text-gray-700 hover:text-green-600 transition-colors"><FacebookIcon /></a>
                            <a href="#" className="text-gray-700 hover:text-green-600 transition-colors"><WhatsAppIcon /></a>
                            <a href="#" className="text-gray-700 hover:text-green-600 transition-colors"><TikTokIcon /></a>
                            <a href="#" className="text-gray-700 hover:text-green-600 transition-colors"><YouTubeIcon /></a>
                        </div>
                    </div>

                    {/* Right Column: Inquiry Form */}
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Send an Inquiry</h2>
                        <form className="space-y-4">
                            <input type="text" placeholder="Your Name" className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"/>
                            <input type="email" placeholder="Your Email" className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"/>
                            <input type="text" placeholder="Subject" className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"/>
                            <textarea placeholder="Your Message" rows="5" className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"></textarea>
                            <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactUs;