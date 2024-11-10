import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg p-12 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-semibold text-center mb-10 text-gray-600">
          Admin Login
        </h1>
        <div className="space-y-10">
          <div className="relative">
            <input
              autoComplete="off"
              id="email"
              name="email"
              type="text"
              className="peer placeholder-transparent h-14 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="Email address"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-4 text-gray-600 text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all peer-focus:-top-4 peer-focus:text-blue-500 peer-focus:text-lg"
            >
              Email Address
            </label>
          </div>
          <div className="relative">
            <input
              autoComplete="off"
              id="password"
              name="password"
              type="password"
              className="peer placeholder-transparent h-14 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-4 text-gray-600 text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all peer-focus:-top-4 peer-focus:text-blue-500 peer-focus:text-lg"
            >
              Password
            </label>
          </div>
          <button className="w-full bg-blue-500 text-white rounded-lg py-4 text-lg font-medium hover:bg-blue-600 focus:outline-none">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
