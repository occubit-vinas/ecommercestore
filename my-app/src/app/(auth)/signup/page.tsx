"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { signupForm } from "@/types/auth.types";
import { useAuthStore } from "@/stores/auth/auth";
import { useRouter } from "next/navigation";

export default function Signup() {

  const {loading,message,handleUserSignup,isSignUp} = useAuthStore();
  const [formData, setFormData] = useState<signupForm>({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleUserSignup(formData.name,formData.email,formData.password);
    if(isSignUp){
      
      router.push(`/varify-otp?=${formData.email}`);
    }
    setFormData({name:"",email:"",password:""});
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Signup
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-6 rounded bg-gray-700 text-white"
          required
        />

        <button
        disabled={loading}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? 'Loading...': 'Create Account'}
        </button>

        {message && (
          <p className="text-center text-red-400 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
}
