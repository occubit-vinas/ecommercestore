export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface LoginData {
  id: string;
  name: string;
  email: string;
  mobileNumber: string | null;
  roleId: string;
  image: string | null;
  profileUrl: string | null;
  authProvider: string; 
  providerId: string | null;
  verified: boolean;
  verifiedAt: string;
  lastLogin: string;
  loginAttempts: number;
  lockedUntil: string | null;
  accessToken: string;
  refreshToken: string;
  isActive: boolean;
  storeId: string;
}

export type LoginApiResponse = ApiResponse<LoginData>;

export interface SignupData {
  id: string;
  email: string;
}

export type SignupApiTypes = ApiResponse<SignupData>;

export interface useAuthStoreTypes {
    loading:boolean,
    message:String | null,
    loginData:LoginData | null,
    uservarifyData: UserData | null
    handleuserLogin:(email:string,password:string) => Promise<void>,
    handleUserSignup:(name:string,email:string,password:string)=>Promise<void>,
    handleUserVarify:(email:string,otp:string)=>Promise<void>
}

export  interface signupForm {
    name: string,
    email: string,
    password: string
  }

  export interface UserData {
  id: string;
  storeId: string | null;
  name: string;
  email: string;
  mobileNumber: string | null;
  profileUrl: string | null;
  roleId: string;
  authProvider: string;
  providerId: string | null;
  refreshToken: string;
  accessToken: string;
  expiresAt: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  verified: boolean;
  verifiedAt: string;
  lastLogin: string;
  loginAttempts: number;
  lockedUntil: string | null;
  twoFactorEnabled: boolean;
  twoFactorSecret: string | null;
  emailVerificationOtp: string | null;
  emailVerificationExpires: string | null;
  passwordResetOtp: string | null;
  passwordResetExpires: string | null;
  notificationEmail: boolean;
  notificationSms: boolean;
  notificationPush: boolean;
  language: string;
  currency: string;
  timezone: string;
  address: string | null;
  isActive: boolean;
}

export interface varifyUserApiTypes {
  statusCode: number;
  data: UserData | null;  // null when success=false
  message: string;
  success: boolean;
}
