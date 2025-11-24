"use client";

import { useState, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://backend.occubitsolution.com/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login Success:", res.data);

      const userData = res.data.data;

      // Store token
      Cookies.set("token", userData.accessToken, { expires: 7 });

      // Store full user object
      Cookies.set("user", JSON.stringify(userData), { expires: 7 });

      console.log("Saved token:", Cookies.get("token"));

      router.push("/");
    } catch (err) {
      const error = err as AxiosError<any>;
      console.log("Login Error:", error);

      setMessage(error.response?.data?.message || "Invalid login");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>

        {message && (
          <p className="text-center text-red-400 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
}
