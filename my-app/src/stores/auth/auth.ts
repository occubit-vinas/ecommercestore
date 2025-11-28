import { create } from "zustand";
import { persist } from "zustand/middleware";
import { handleLogin, handleSignup, handleVarify } from "@/servicies/auth/login.service";
import { validateLoginCredentials, validateSignupCredentials } from "@/utils/validation";
import { useAuthStoreTypes } from "@/types/auth.types";

export const useAuthStore = create<useAuthStoreTypes>()(
  persist(
    (set, get) => ({
      loading: false,
      message: null,
      loginData: null,
      uservarifyData: null,
      isSignUp: false,

      handleuserLogin: async (email: string, password: string) => {
        set({ loading: true });

        const { isValid, errors } = validateLoginCredentials(email, password);

        if (!isValid) {
          set({
            message: errors?.email || errors?.password,
            loading: false,
          });
          return;
        }

        const { success, data, message } = await handleLogin(email, password);

        if (!success) {
          set({
            message: message || "Email or password is wrong",
            loading: false,
          });
          return;
        }

        set({
          loginData: data,
          message: "Login success",
          loading: false,
        });
        return;
      },

      handleUserSignup: async (name: string, email: string, password: string) => {
        set({ loading: true });

        const { isValid, errors } = validateSignupCredentials(name, email, password);

        if (!isValid) {
          set({
            message: errors?.name || errors?.email || errors?.password,
            loading: false,
          });
          return;
        }

        const { success, message } = await handleSignup(name, email, password);

        set({ message: message.message, loading: false, isSignUp: success });
      },

      handleUserVarify: async (email: string, finalOtp: string) => {
        set({ loading: true });

        if (finalOtp.length !== 6) {
          set({ message: "Enter 6 digits", loading: false });
          return;
        }

        const {success , data} = await handleVarify(email, finalOtp);

        if (success) {
          set({
            uservarifyData: data.data,
            message: "OTP verified successfully",
            loading: false,
          });
        } else {
          set({ message: data, loading: false });
        }
        return;
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        uservarifyData: state.uservarifyData,
      }),
    }
  )
);
