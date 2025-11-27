import { create } from "zustand";
import { handleLogin ,handleSignup,handleVarify} from "@/servicies/auth/login.service";
import { validateLoginCredentials } from "@/utils/validation";
import { LoginData } from "@/types/auth.types";
import { useAuthStoreTypes } from "@/types/auth.types";
import { validateSignupCredentials } from "@/utils/validation";
import { redirect } from "next/navigation";

export const useAuthStore = create<useAuthStoreTypes>((set, get) => ({
    loading: false,
    message: null,
    loginData: null,
    handleuserLogin: async (email: string, password: string) => {
        set({ loading: true });
        const { isValid, errors } = validateLoginCredentials(email, password);

        if (isValid) {
            try {
                const { success, data } = await handleLogin(email, password);
                console.log(success);
                
                if (success) set({ message: 'login success' });
                if(!success) set({message:'email or password is wrong'})
                set({
                    loading: false,
                });
                if (success) {
                    set({ data: data })
                }
                console.log("Stored object",get().data);
                
            } catch (error) {
                set({ message: 'email and password are wrong' })
            }
        } else {

            set({ message: errors?.email || errors?.password, loading: false })
        }
    },
    handleUserSignup:async(name:string,email:string,password:string)=>{
        set({loading:true});

        const {isValid,errors} = validateSignupCredentials(name,email,password);

        if(isValid){
            const responce = await handleSignup(name,email,password);
            console.log('res is',responce);
            set({message:responce.message,loading:false});

            if(responce.success){
                alert(responce.message);
                redirect(`/varify-otp?email=${email}`);
            }
            
        }else{
            set({message:errors?.name || errors?.email || errors?.password , loading:false})
        }
    },
    handleUserVarify:async(email:string,otp:string[])=>{
        
        set({loading:true});
        const finalotp = otp.join("");

        if(finalotp.length === 6 ){
            try {
                const responce = await handleVarify(email,finalotp);
                console.log('otp res',responce);
                set({message:responce.message})
                
            } catch (error) {
                console.log('otp res...',error);
                set({message:'invalid otp'});
            }
        }else{

            set({message:'enter 6 digits'});
        }
        
        set({loading:false})
    }
}));
