'use server'
import axios from "axios";
import { cookies } from "next/headers";
import { BASE_URL, STORE_ID } from "@/config/api";
import { LoginApiResponse } from "@/types/auth.types";
import { varifyUserApiTypes } from "@/types/auth.types";
import { SignupApiTypes } from "@/types/auth.types";
import { responce } from "@/stores/data";


export const handleLogin = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/login`,
      { email, password }
    );

    const userData = res.data.data;
    // cookies().set("token", userData.accessToken, {
    //   maxAge: 60 * 60 * 24 * 7,
    //   httpOnly: true,
    //   secure: true,
    //   path: "/",
    // });

    // cookies().set("user", JSON.stringify(userData), {
    //   maxAge: 60 * 60 * 24 * 7,
    //   path: "/",
    // });

    localStorage.setItem('login-data',userData);
    return { success: true, data: userData };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Login failed",
    };
  }
};


export const handleSignup = async (name: string, email: string, password: string) => {
    try {
        const responce = await axios.post<SignupApiTypes>(`${BASE_URL}/auth/signup}`, {
            name: name,
            email: email,
            password: password,
            store_id: STORE_ID,
            role: 'Admin',
        })
        console.log('signup responce', responce);
        
        return {success:true,message:responce.data};

    } catch (error: any) {
        return {success:false,message:error};
    }
}

export const handleVarify = async (email: string, otp: string) => {
    try {
        const responce = await axios.post<varifyUserApiTypes>(`${BASE_URL}/auth/verify-user`,
            {
                email,
                otp: otp,
            })
        return { success: true, data: responce.data };
    } catch (error: any) {
        return {
            success: false,
            data: error.response?.data?.message || "Network error",
        }
    };
}