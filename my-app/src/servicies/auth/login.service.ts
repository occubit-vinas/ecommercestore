import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL, STORE_ID } from "@/config/api";
import { LoginApiResponse } from "@/types/auth.types";
import { varifyUserApiTypes } from "@/types/auth.types";
import { SignupApiTypes } from "@/types/auth.types";
import { responce } from "@/stores/data";

export const handleLogin = async (email: string, password: string) => {
    try {
        const res = await axios.post<LoginApiResponse>(
            `${BASE_URL}/auth/login`,
            { email, password }
        );

        const userData = res.data.data;

        Cookies.set("token", userData.accessToken, { expires: 7 });
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });

        return { success: true, data: userData };
    } catch (error: any) {
        console.log("login failed:", error?.response?.data);

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
            message: error.response?.data?.message || "Network error",
        }
    };
}