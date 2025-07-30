import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../Base/api';

const AuthModal = ({ show, onClose, onAuthSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!show) return null;

  const isStrongPassword = (pwd) => {
    // At least 1 uppercase, 1 number, 1 special character, min 6 characters
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(pwd);
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!isLoginView) {
      if (!isStrongPassword(password)) {
        toast.error('Password must include at least one uppercase letter, one number, and one special character.');
        return;
      }
      const data = {
        UserType: 2,
        FirstName: fullName,
        LastName: "Web User",
        Email: email,
        Address: "",
        MobileNumber: "0000000000",
        Password: password,
        ConfirmPassword: password,
        WarehouseId: 1,
        UserRole: 5,
        IsWebUser: true,
      };

      fetch(`${BASE_URL}/User/SignUp`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.statusCode == 200) {
            setIsLoginView(true);
            toast.success('Sign up successful!');
            setFullName('');
            setEmail('');
            setPassword('');
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          toast.error(error.message || "Sign up failed. Please try again.");
        });
    } else {
      if (!email || !password) {
        toast.error("Please enter email and password");
        return;
      }
      try {
        const response = await fetch(`${BASE_URL}/User/SignIn`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
            Password: password,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        const responseData = await response.json();

        if (responseData.statusCode === 200) {
          toast.success("Login successful");
          const token = responseData.result.accessToken;
          localStorage.setItem("token", token);
          onAuthSuccess();
        }
      } catch (error) {
        toast.error(error.message || "Login failed. Please try again.");
      }
    }
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

      <div className="fixed inset-0 flex justify-center items-center z-40 p-4">
        <div className="absolute inset-0">
          <img
            src="/login.webp"
            alt="Main background"
            className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>
        <div className="relative w-full max-w-md aspect-square rounded-lg shadow-2xl overflow-hidden border border-gray-200/20">
          <div className="absolute inset-0">
            <video
              // src="/loginc.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 p-12 text-center flex flex-col justify-center h-full">
            <div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                    {isLoginView ? 'Login' : 'Create an Account'}
                </h3>
                <form onSubmit={handleAuth} className="grid grid-cols-1 gap-4">
                {!isLoginView && (
                    <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="p-3 border border-gray-500 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                )}
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 border border-gray-500 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 border border-gray-500 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />

                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-2">
                    {isLoginView ? 'Login' : 'Sign Up'}
                </button>
                </form>

                <p className="text-gray-300 mt-4 text-sm">
                {isLoginView ? "Don't have an account?" : "Already have an account?"}
                <button
                    onClick={() => setIsLoginView(!isLoginView)}
                    className="ml-2 text-green-300 hover:underline bg-transparent border-none cursor-pointer"
                >
                    {isLoginView ? 'Sign Up' : 'Login'}
                </button>
                </p>

                <button
                onClick={onClose}
                className="mt-4 text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer"
                >
                Cancel
                </button>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
};

export default AuthModal;