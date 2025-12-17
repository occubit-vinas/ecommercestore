import { create } from "zustand";
import { persist } from "zustand/middleware";
import { handleLogin, handleSignup, handleVarify } from "@/servicies/auth/login.service";
import { validateLoginCredentials, validateSignupCredentials } from "@/utils/validation";
import { useAuthStoreTypes } from "@/types/auth.types";
import { setEncryptedItem } from "@/utils/encryption";
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
          set({ message: errors?.email || errors?.password, loading: false });
          return { success: false };
        }

        const result = await handleLogin(email, password);

        if (!result.success) {
          set({ message: result.message, loading: false });
          return { success: false };
        }

        set({
          loginData: result.data,
          message: "Login success",
          loading: false,
        });

        // optional (client-only)
        // localStorage.setItem("accessToken", result.data.accessToken);
        setEncryptedItem('accessToken', result.data.accessToken);

        return { success: true };
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

        const { success, data } = await handleVarify(email, finalOtp);

        if (success) {
          set({
            uservarifyData: data.data,
            message: "OTP verified successfully",
            loading: false,
          });
        } else {
          set({ message: data, loading: false });
        }
      },

      // logout: () => {
      //   set({
      //     loginData: null,
      //     uservarifyData: null,
      //     isSignUp: false,
      //   });
      // },
    }),
    {
      name: "auth-store",

      partialize: (state) => ({
        loginData: state.loginData,
        uservarifyData: state.uservarifyData,
        isSignUp: state.isSignUp,
      }),
    }
  )
);
