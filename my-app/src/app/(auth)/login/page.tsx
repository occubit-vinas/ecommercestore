"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth/auth";

export default function Login() {
  const { handleuserLogin, loading, message} = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleuserLogin(email, password);
    console.log(message);
    setEmail('');
    setPassword('');
    
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password + Toggle */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="absolute right-2 top-2 text-sm text-gray-300"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {!loading ? "Login" : "Loading..."}
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}
