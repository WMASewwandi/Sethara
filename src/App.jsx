import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Treatments from './components/Treatments';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Appointment from './components/Appointment';
import AuthModal from './components/AuthModal';
import Packages from './components/Packages';
import Services from './components/Services';
import AllPackages from './components/AllPackages';
import PrivacyPolicy from './components/PrivacyPolicy';
import RefundPolicy from './components/RefundPolicy'; 
import './index.css';
import TermsAndConditions from './components/TermsAndConditions';


export default function App() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 1. Add login state

  // 2. Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  useEffect(() => {
    window.location.hash = page;
  }, [page]);
  
  useEffect(() => {
    const favicon = document.querySelector("link[rel~='icon']");
    if (favicon) {
      favicon.href = '/header.jpeg';
    }
  }, []);

  const navLinks = [
    { name: 'Home', path: 'home' },
    { name: 'About Us', path: 'about' },
    { name: 'Treatments', path: 'treatments' },
    { name: 'Packages', path: 'packages' },
    { name: 'Contact Us', path: 'contact' }
  ];

  const navigateTo = (path) => {
    setPage(path);
    window.scrollTo(0, 0); 
  };
  
  // 3. Update handleAuthSuccess to set login state
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsLoggedIn(true);
    navigateTo('appointment');
  };

  // 4. Create a logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigateTo('home'); // Navigate to home page on logout
  };

  const renderPage = () => {
    const PageWrapper = ({ children }) => <div className="pt-28">{children}</div>;

    switch (page) {
      case 'home':
        return (
          <>
            <Hero onAppointmentClick={() => setShowAuthModal(true)} />
            <Welcome />
            <Treatments />
            <AboutUs />
            <Services />
            <Packages onBookNowClick={() => setShowAuthModal(true)} onViewAllClick={() => navigateTo('all-packages')} />
            <ContactUs />
          </>
        );
      case 'about':
        return <PageWrapper><AboutUs /></PageWrapper>;
      case 'treatments':
        return <PageWrapper><Treatments /></PageWrapper>;
      case 'packages':
        return <PageWrapper><Packages onBookNowClick={() => setShowAuthModal(true)} onViewAllClick={() => navigateTo('all-packages')} /></PageWrapper>;
      case 'all-packages':
        return <PageWrapper><AllPackages onBookNowClick={() => setShowAuthModal(true)} /></PageWrapper>;
      case 'gallery':
        return <PageWrapper><Gallery /></PageWrapper>;
      case 'contact':
        return <PageWrapper><ContactUs /></PageWrapper>;
        case 'privacy-policy':
        return <PageWrapper><PrivacyPolicy /></PageWrapper>;
         case 'refund-policy':
        return <PageWrapper><RefundPolicy /></PageWrapper>;
        case 'terms':
        return <PageWrapper><TermsAndConditions /></PageWrapper>;
      case 'appointment':
        return <PageWrapper><Appointment /></PageWrapper>;
      case 'profile':
        return <PageWrapper><UserProfile /></PageWrapper>;
      default:
        return (
          <>
            <Hero onAppointmentClick={() => setShowAuthModal(true)} />
            <Welcome />
            <Treatments />
            <AboutUs />
            <Services />
            <Packages onBookNowClick={() => setShowAuthModal(true)} onViewAllClick={() => navigateTo('all-packages')} />
            <ContactUs />
          </>
        );
    }
  };

  return (
    <>
      <style>
        {`
          body {
            background-color: #F9FAFB;
          }
        `}
      </style>
      <div className="font-sans text-gray-800 relative bg-transparent">
        <div className={`transition-filter duration-300 ${showAuthModal ? 'filter blur-sm pointer-events-none' : ''}`}>
          <div className="flex flex-col min-h-screen">
            {/* 5. Pass new props to the Header */}
            <Header 
              navLinks={navLinks} 
              onLogoClick={() => navigateTo('home')} 
              onNavigate={navigateTo}
              currentPage={page}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setShowAuthModal(true)}
              onLogout={handleLogout}
            />
            <div className="flex-grow pb-20">
              {renderPage()}
            </div>
            <Footer onNavigate={navigateTo} />
          </div>
        </div>
        
        <AuthModal 
          show={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    </>
  );
}