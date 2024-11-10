"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Please fill all the required fields!");
      return;
    }
    setIsLoading(true);
    try {
      const params = { email, password };
      const res = await axios.post("/api/users/login", params);
      setIsLoading(false);
      if (res.data.token) {
        const token = res.data.token;
        router.push(`/admin-screen?token=${token}`);
      }
    } catch (error) {
      console.log("error: ", error.response.data.message);
      setIsLoading(false);
      if (error.response.data.message) {
        setErrorMessage(error?.response?.data?.message);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg p-12 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-semibold text-center mb-4 text-gray-600">
          Admin Login
        </h1>
        {errorMessage && (
          <div className="error-container">
            <p className="text-red-500 text-sm">{errorMessage || ""}</p>
          </div>
        )}
        <form className="space-y-10 mt-8">
          <div className="relative">
            <input
              autoComplete="off"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="peer placeholder-transparent h-14 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-4 text-gray-600 text-lg peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all peer-focus:-top-4 peer-focus:text-blue-500 peer-focus:text-lg"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white rounded-lg py-4 text-lg font-medium hover:bg-blue-600 focus:outline-none"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
