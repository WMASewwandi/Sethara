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
import './index.css';


export default function App() {
  const [page, setPage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  
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
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    navigateTo('appointment');
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
      case 'treatments': // This now correctly points to the Treatments component
        return <PageWrapper><Treatments /></PageWrapper>;
      case 'packages':
        return <PageWrapper><Packages onBookNowClick={() => setShowAuthModal(true)} onViewAllClick={() => navigateTo('all-packages')} /></PageWrapper>;
        case 'all-packages': // New case
        return <PageWrapper><AllPackages onBookNowClick={() => setShowAuthModal(true)} /></PageWrapper>;
      case 'gallery':
        return <PageWrapper><Gallery /></PageWrapper>;
      case 'contact':
        return <PageWrapper><ContactUs /></PageWrapper>;
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
            <Header 
              navLinks={navLinks} 
              onLogoClick={() => navigateTo('home')} 
              onNavigate={navigateTo}
              currentPage={page}
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
