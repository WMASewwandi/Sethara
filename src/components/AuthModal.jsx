import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../Base/api';

// --- Helper Icon Components (remain the same) ---
const EyeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> );
const EyeSlashIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" /></svg> );
const SpinnerIcon = () => ( <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> );

const AuthModal = ({ show, onClose, onAuthSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!show) return null;

  const isStrongPassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(pwd);
  };

  // ✅ 1. NEW FUNCTION TO HANDLE VIEW TOGGLE AND RESET FORM
  const handleViewToggle = () => {
    // Reset all form fields
    setFullName('');
    setEmail('');
    setPassword('');
    // Toggle the view
    setIsLoginView(!isLoginView);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isLoginView) { // --- Sign Up Logic ---
        if (!isStrongPassword(password)) {
          throw new Error('Password must include an uppercase letter, a number, and a special character.');
        }
        const signUpData = { UserType: 2, FirstName: fullName, LastName: "Web User", Email: email, Address: "", MobileNumber: "0000000000", Password: password, ConfirmPassword: password, WarehouseId: 1, UserRole: 5, IsWebUser: true };
        
        const response = await fetch(`${BASE_URL}/User/SignUp`, {
          method: "POST",
          body: JSON.stringify(signUpData),
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (response.ok && data.statusCode === 200 && typeof data.result === 'string' && data.result.length > 50) {
          toast.success('Account created successfully! Logging you in...');
          const token = data.result;
          localStorage.setItem("token", token);
          
          setTimeout(() => {
            onAuthSuccess();
          }, 1500);
        } else {
          throw new Error(data.message || 'An unknown error occurred during sign-up.');
        }

      } else { // --- Login Logic ---
        if (!email || !password) {
          throw new Error("Please enter email and password");
        }
        const response = await fetch(`${BASE_URL}/User/SignIn`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Email: email, Password: password }),
        });

        const data = await response.json();

        if (response.ok && data.statusCode === 200 && data.result?.accessToken) {
          toast.success("Login successful");
          const token = data.result.accessToken;
          localStorage.setItem("token", token);
          
          setTimeout(() => {
            onAuthSuccess();
          }, 1000);
        } else {
          throw new Error(data.message || "Login failed. Please check your credentials.");
        }
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false); // Make sure loading stops on error
    } 
    // Removed the finally block to manage loading state within the try/catch
  };

  return (
    <>
      <style>{`@keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.1); } } .animate-slow-zoom { animation: slowZoom 20s infinite alternate ease-in-out; }`}</style>
      <div className="fixed inset-0 flex justify-center items-center z-40 p-4">
        {/* ... (rest of the JSX is the same) ... */}
        <div className="absolute inset-0"><img src="/login.webp" alt="Main background" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" /><div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div></div>
        <div className="relative w-full max-w-md aspect-square rounded-lg shadow-2xl overflow-hidden border border-gray-200/20">
          <div className="absolute inset-0"><video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0 bg-black/60"></div></div>
          <div className="relative z-10 p-8 md:p-12 text-center flex flex-col justify-start md:justify-center h-full overflow-y-auto">
            <div>
                <h3 className="text-2xl font-bold mb-6 text-white">{isLoginView ? 'Login' : 'Create an Account'}</h3>
                <form onSubmit={handleAuth} className="grid grid-cols-1 gap-4">
                {!isLoginView && (<input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="p-3 border border-gray-500 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none" />)}
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 border border-gray-500 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none" />
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-500 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-300 hover:text-white" aria-label="Toggle password visibility">
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>
                <button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-2 flex justify-center items-center gap-2 disabled:bg-green-800 disabled:cursor-not-allowed">
                  {isLoading ? (<><SpinnerIcon />{isLoginView ? 'Logging In...' : 'Signing Up...'}</>) : (isLoginView ? 'Login' : 'Sign Up')}
                </button>
                </form>
                {/* ✅ 2. UPDATED BUTTON to use the new handler */}
                <p className="text-gray-300 mt-4 text-sm">{isLoginView ? "Don't have an account?" : "Already have an account?"}
                  <button onClick={handleViewToggle} className="ml-2 text-green-300 hover:underline bg-transparent border-none cursor-pointer">
                    {isLoginView ? 'Sign Up' : 'Login'}
                  </button>
                </p>
                <button onClick={onClose} className="mt-4 text-gray-400 hover:text-white text-sm bg-transparent border-none cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </div>
    </>
  );
};

export default AuthModal;