import React, { useState } from 'react';
import { WhatsAppIcon, MailIcon, Icon } from './Icons';

const Header = ({ navLinks, onNavigate, onLogoClick, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = currentPage === 'home';

  const handleNavClick = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  // Define styles based on the current page
  const headerClasses = isHomePage
    ? 'absolute top-0 left-0 w-full z-50 p-4' // Transparent for home
    : 'absolute top-0 left-0 w-full z-50 p-4 bg-transparent'; // Light, blurred for other pages

  const textColor = isHomePage ? 'text-white' : 'text-gray-800';
  const hoverColor = isHomePage ? 'hover:text-green-300' : 'hover:text-green-600';
  const navBg = isHomePage ? 'bg-transparent' : 'margin-bottom-10';
  const mobileMenuBg = isHomePage ? 'bg-black/50 backdrop-blur-lg' : 'bg-white shadow-lg';
  const mobileMenuHr = isHomePage ? 'border-gray-500' : 'border-gray-200';


  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <button onClick={onLogoClick} className="cursor-pointer bg-transparent border-none">
          <img src="/header.png" alt="Clinic Logo" className="h-20" />
        </button>

        {/* Right side: Desktop Navigation and Social Icons */}
        <div className="hidden md:flex items-center space-x-6">
            <nav className={`flex items-center space-x-8 py-2 px-6 rounded-full ${navBg}`}>
              {navLinks.map(link => (
                <button key={link.name} onClick={() => handleNavClick(link.path)} className={`${textColor} ${hoverColor} font-semibold transition duration-300 bg-transparent border-none cursor-pointer`}>
                  {link.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <a href="075 315 5777" className={`${textColor} ${hoverColor}`}><WhatsAppIcon /></a>
              <a href="#" className={`${textColor} ${hoverColor}`}><MailIcon /></a>
            </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button className={`md:hidden ${textColor}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
           <Icon>
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
            </Icon>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className={`md:hidden mt-4 rounded-lg p-4 flex flex-col items-start space-y-3 ${mobileMenuBg}`}>
          {navLinks.map(link => (
            <button key={link.name} onClick={() => handleNavClick(link.path)} className={`${textColor} ${hoverColor} font-semibold w-full text-left`}>
              {link.name}
            </button>
          ))}
          <hr className={`w-full my-2 ${mobileMenuHr}`}/>
           <div className="flex items-center space-x-4 pt-2">
              <a href="#" className={`${textColor} ${hoverColor}`}><WhatsAppIcon /></a>
              <a href="#" className={`${textColor} ${hoverColor}`}><MailIcon /></a>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;