"use client";

import { useState, useRef, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth/auth";


export default function VerifyOtp() {
  const {loading,message,handleUserVarify} = useAuthStore();



  const params = useSearchParams();
  const email = params.get("email") || "";
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  const handleVerify = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      await handleUserVarify(email,otp);    
      setOtp(["","","","","",""]);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <form
        onSubmit={handleVerify}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-3xl text-white text-center mb-4">Verify OTP</h2>

        <p className="text-gray-400 mb-4 text-center">
          OTP sent to <span className="text-blue-400">{email}</span>
        </p>

        {/* OTP BOXES */}
        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          {loading ? 'Loading...' : ' Verify OTP'}
        </button>

        {message && (
          <p className="text-center text-gray-300 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
}
