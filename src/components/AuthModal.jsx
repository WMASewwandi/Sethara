import React, { useState } from 'react';

const AuthModal = ({ show, onClose, onAuthSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  if (!show) {
    return null;
  }

  const handleAuth = (e) => {
    e.preventDefault();
    onAuthSuccess();
  };

  return (
    <>
      <style>
        {`
          @keyframes slowZoom {
            from { transform: scale(1); }
            to { transform: scale(1.1); }
          }
          .animate-slow-zoom {
            animation: slowZoom 20s infinite alternate ease-in-out;
          }
        `}
      </style>
      <div className="fixed inset-0 flex justify-center items-center z-40">
        {/* Layer 1: Main Full-screen Background */}
        <div className="absolute inset-0">
          <img 
            src="/login.webp" 
            alt="Main background"
            className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>

        {/* Layer 2: The Popup Window Card */}
        <div className="relative w-full max-w-sm mx-4 rounded-lg shadow-2xl overflow-hidden border border-gray-200/20">
          
          {/* Background Video and Overlay for the popup window */}
          <div className="absolute inset-0">
            <video 
              src="/loginc.mp4" 
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Form Content */}
          <div className="relative z-10 p-8 text-center">
            <h3 className="text-2xl font-bold mb-6 text-white">{isLoginView ? 'Login' : 'Create an Account'}</h3>
            <form onSubmit={handleAuth} className="grid grid-cols-1 gap-4">
              {!isLoginView && (
                <input type="text" placeholder="Full Name" className="p-3 border border-gray-500 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none" />
              )}
              <input type="email" placeholder="Email Address" className="p-3 border border-gray-500 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none" />
              <input type="password" placeholder="Password" className="p-3 border border-gray-500 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none" />
              
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-2">
                {isLoginView ? 'Login' : 'Sign Up'}
              </button>
            </form>
            
            <p className="text-gray-300 mt-4 text-sm">
              {isLoginView ? "Don't have an account?" : "Already have an account?"}
              <button onClick={() => setIsLoginView(!isLoginView)} className="ml-2 text-green-300 hover:underline bg-transparent border-none cursor-pointer">
                {isLoginView ? 'Sign Up' : 'Login'}
              </button>
            </p>

            <button onClick={onClose} className="mt-4 text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
