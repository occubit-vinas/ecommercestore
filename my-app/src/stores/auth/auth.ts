import { create } from "zustand";
import { handleLogin, handleSignup, handleVarify } from "@/servicies/auth/login.service";
import { validateLoginCredentials } from "@/utils/validation";
import { LoginData } from "@/types/auth.types";
import { useAuthStoreTypes } from "@/types/auth.types";
import { validateSignupCredentials } from "@/utils/validation";
import { redirect } from "next/navigation";
import { persist } from "zustand/middleware";

export const useAuthStore = create<useAuthStoreTypes>(persist((set, get) => ({
    loading: false,
    message: null,
    loginData: null,
    uservarifyData:null,
    handleuserLogin: async (email: string, password: string) => {
    set({ loading: true });

    const { isValid, errors } = validateLoginCredentials(email, password);

    if (!isValid) {
        return set({
            message: errors?.email || errors?.password,
            loading: false,
        });
    }

    const { success, data, message } = await handleLogin(email, password);

    console.log("Login success:", success);

    if (!success) {
        return set({
            message: message || "Email or password is wrong",
            loading: false,
        });
    }

    // SUCCESS
    set({
        data: data,
        message: "Login success",
        loading: false,
    });

    console.log("Stored object", get().data);
},

    handleUserSignup: async (name: string, email: string, password: string) => {
        set({ loading: true });

        const { isValid, errors } = validateSignupCredentials(name, email, password);

        if (isValid) {
            const {success,message} = await handleSignup(name, email, password);
            console.log('res is', message);
            set({ message: message.message, loading: false });

            if (success) {
                alert(message.message);
                redirect(`/varify-otp?email=${email}`);
            }
        } else {
            set({ message: errors?.name || errors?.email || errors?.password, loading: false })
        }
    },
    handleUserVarify: async (email: string, otp: string[]) => {
        set({ loading: true });

        const finalOtp = otp.join("");

        if (finalOtp.length !== 6) {
            set({ message: "Enter 6 digits", loading: false });
            return;
        }

        const result = await handleVarify(email, finalOtp);

        console.log("OTP result:", result);

        if (result.success) {
            set({ message: "OTP verified successfully", loading: false ,uservarifyData:result});
            
        } else {
            set({ message: result.message, loading: false });
        }
    }
}),{
    name:"auth-store",
    partialize:(state)=>({
        uservarifyData:state.uservarifyData,
    })
}));
