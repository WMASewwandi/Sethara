import React, { useState } from 'react';
import { WhatsAppIcon, MailIcon, Icon } from './Icons';

const Header = ({ navLinks, onNavigate, onLogoClick, currentPage, isLoggedIn, onLoginClick, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = currentPage === 'home';

  const handleNavClick = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const headerClasses = isHomePage
    ? 'absolute top-0 left-0 w-full z-50 p-4'
    : 'absolute top-0 left-0 w-full z-50 p-4 bg-transparent';

  // Define text colors for different states
  const textColor = isHomePage ? 'text-white' : 'text-gray-800';
  const hoverColor = isHomePage ? 'hover:text-green-300' : 'hover:text-green-600';
  // 1. Define the color for the active link
  const activeColor = isHomePage ? 'text-green-300' : 'text-green-600';
  const navBg = isHomePage ? 'bg-transparent' : 'margin-bottom-10';
  const mobileMenuBg = isHomePage ? 'bg-black/50 backdrop-blur-lg' : 'bg-white shadow-lg';
  const mobileMenuHr = isHomePage ? 'border-gray-500' : 'border-gray-200';

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex justify-between items-center">
        <button onClick={onLogoClick} className="cursor-pointer bg-transparent border-none">
          <img src="/header.png" alt="Clinic Logo" className="h-20" />
        </button>

        <div className="hidden md:flex items-center space-x-6">
          <nav className={`flex items-center space-x-8 py-2 px-6 rounded-full ${navBg}`}>
            {navLinks.map(link => (
              // 2. Conditionally apply the activeColor class
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.path)} 
                className={`${currentPage === link.path ? activeColor : textColor} ${hoverColor} font-semibold transition duration-300 bg-transparent border-none cursor-pointer`}
              >
                {link.name}
              </button>
            ))}
             {isLoggedIn ? (
              <button onClick={onLogout} className={`${textColor} ${hoverColor} font-semibold transition duration-300 bg-transparent border-none cursor-pointer`}>
                Logout
              </button>
            ) : (
              <button onClick={onLoginClick} className={`${textColor} ${hoverColor} font-semibold transition duration-300 bg-transparent border-none cursor-pointer`}>
                Login
              </button>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            <a href="tel:0753155777" className={`${textColor} ${hoverColor}`}><WhatsAppIcon /></a>
            <a href="mailto:example@mail.com" className={`${textColor} ${hoverColor}`}><MailIcon /></a>
          </div>
        </div>
        
        <button className={`md:hidden ${textColor}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Icon>
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </Icon>
        </button>
      </div>

      {isMenuOpen && (
        <div className={`md:hidden mt-4 rounded-lg p-4 flex flex-col items-start space-y-3 ${mobileMenuBg}`}>
          {navLinks.map(link => (
            // 3. Apply the same logic to the mobile menu
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.path)} 
              className={`${currentPage === link.path ? activeColor : textColor} ${hoverColor} font-semibold w-full text-left`}
            >
              {link.name}
            </button>
          ))}
          {isLoggedIn ? (
            <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className={`${textColor} ${hoverColor} font-semibold w-full text-left`}>
              Logout
            </button>
          ) : (
            <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className={`${textColor} ${hoverColor} font-semibold w-full text-left`}>
              Login
            </button>
          )}
          <hr className={`w-full my-2 ${mobileMenuHr}`}/>
          <div className="flex items-center space-x-4 pt-2">
            <a href="tel:0753155777" className={`${textColor} ${hoverColor}`}><WhatsAppIcon /></a>
            <a href="mailto:example@mail.com" className={`${textColor} ${hoverColor}`}><MailIcon /></a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;