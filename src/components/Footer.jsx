import React from 'react';
import { XIcon, InstagramIcon, YouTubeIcon, FacebookIcon, ArrowUpIcon } from './Icons';

const Footer = ({ onNavigate }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <style>
                {`
                    .footer-group:hover {
                        cursor: url('/leaf-cursor.png'), auto;
                    }
                    .footer-bg::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-image: url('/leaf-pattern.png');
                        background-size: 500px;
                        background-repeat: repeat;
                        opacity: 0.2;
                        z-index: 0;
                        /* Sway animation removed */
                    }
                    /* Responsive adjustments for mobile */
                    @media (max-width: 768px) {
                        .footer-bg::before {
                            background-size: cover; /* Cover the area without repeating */
                            background-position: center;
                        }
                    }
                `}
            </style>
            <footer className="bg-[hsla(180,100%,98%,0)] text-white relative overflow-hidden footer-group backdrop-blur-sm">
                <div className="footer-bg"></div>
                <div className="relative z-10 container mx-auto px-9 py-10">
                    <div className="grid md:grid-cols-4 gap-12">
                        {/* Column 1: Logo and Info */}
                        <div className="space-y-6">
                            <img src="/footer.jpg" alt="Logo" className="h-20 brightness-100 contrast-100" />
                            <p className="text-gray-700 text-xl">
                                Empowering your journey to wellness with ancient wisdom and compassionate care.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-800 hover:text-black text-xl"><XIcon /></a>
                                <a href="https://www.youtube.com/channel/UCgHyI9GaWIopEPS4437jo-w" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-red-500"><YouTubeIcon /></a>
                                <a href="https://www.instagram.com/sethara_hela_madura/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-pink-500"><InstagramIcon /></a>
                                <a href="https://www.facebook.com/SetharaHelaWedaMadura/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-500"><FacebookIcon /></a>
                            </div>
                            <button onClick={scrollToTop} className="flex items-center space-x-2 border border-gray-500 rounded-md px-4 py-2 text-gray-700 hover:bg-white/10">
                                <ArrowUpIcon />
                                <span>Back to Top</span>
                            </button>
                        </div>

                        {/* Column 2: Site Map */}
                        <div className="md:col-start-3">
                            <h3 className="font-bold mb-4 text-gray-700">Site Map</h3>
                            <ul className="space-y-2 text-gray-700 text-xl">
                                <li><button onClick={() => onNavigate('home')} className="hover:text-green-600 bg-transparent border-none text-left">Homepage</button></li>
                                <li><button onClick={() => onNavigate('about')} className="hover:text-green-600 bg-transparent border-none text-left">About Us</button></li>
                                <li><button onClick={() => onNavigate('services')} className="hover:text-green-600 bg-transparent border-none text-left">Treatments</button></li>
                                <li><button onClick={() => onNavigate('packages')} className="hover:text-green-600 bg-transparent border-none text-left">Packages</button></li>
                                <li><button onClick={() => onNavigate('contact')} className="hover:text-green-600 bg-transparent border-none text-left">Contact Us</button></li>
                            </ul>
                        </div>

                        {/* Column 3: Legal */}
                        <div>
                            <h3 className="font-bold mb-4 text-gray-700">Legal</h3>
                            <ul className="space-y-2 text-gray-700 text-xl">
                                <li><button onClick={() => onNavigate('privacy-policy')}  className="hover:text-green-600">Privacy Policy</button></li>
                                <li><button onClick={() => onNavigate('refund-policy')} className="hover:text-green-600">Refund Policy</button></li>
                                 <li><button onClick={() => onNavigate('terms')} className="hover:text-green-600">Terms & Conditions</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="relative z-10 bg-gray-600 text-center py-3">
                    <p className="text-sm text-yellow-100">Copyright &copy; {new Date().getFullYear()} Sethara Hela Weda Madura. All Rights Reserved.</p>
                    <p className='text-xs text-yellow-100'>Designed and Developed by Clovesis </p>
                </div>
            </footer>
        </>
    );
};

export default Footer;