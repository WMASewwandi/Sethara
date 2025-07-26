import React from 'react';

const LoginPage = () => (
  <div className="container mx-auto p-8 text-center flex-grow flex flex-col justify-center">
    <h1 className="text-4xl font-bold text-green-700 mb-8">Create an Account</h1>
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-6">
            <input type="text" placeholder="Full Name" className="p-3 border rounded-lg" />
            <input type="email" placeholder="Email Address" className="p-3 border rounded-lg" />
            <input type="password" placeholder="Password" className="p-3 border rounded-lg" />
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">
                Sign Up
            </button>
            <p className="text-gray-600 mt-4">Already have an account? <a href="#" className="text-blue-600 hover:underline">Login</a></p>
        </div>
    </div>
  </div>
);

export default LoginPage;