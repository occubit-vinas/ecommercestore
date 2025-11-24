"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  interface signupform {
    name: string,
    email: string,
    password: string
  }
  const [message, setMessage] = useState<string>("");

  const [formData, setFormData] = useState<signupform>({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.^])[A-Za-z\d@$!%*#?&.^]{6,}$/;

    if (!passwordRegex.test(formData.password)) {
      setMessage(
        "Password must be at least 6 characters long, contain letters, numbers, and a special character."
      );
      return;
    }
    if(!formData.name.trim()){
      setMessage('number can not be empty');
      return;
    }


    try {
      const response = await axios.post(
        "https://backend.occubitsolution.com/api/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          store_id: "cmicq2mup0005q6lfjz98h2yd",
        }
      );

      console.log("Signup Success:", response.data);

      router.push(`/verify-otp?email=${formData.email}`);
    } catch (error: any) {
      console.log("Signup Error:", error);
      setMessage(error.response?.data?.message || "Signup failed");
    }
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
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Create Account
        </button>

        {message && (
          <p className="text-center text-red-400 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
}
