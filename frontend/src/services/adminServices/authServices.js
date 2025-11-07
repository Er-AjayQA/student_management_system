// *********** Imports *********** //
import { AdminAPI, StudentAPI } from "./api";

export const adminAuthServices = {
  // *********** User Signup Service *********** //
  userSignUp: async (userData) => {
    return (
      await AdminAPI.post("/user-signup", userData, { withCredentials: false })
    ).data;
  },

  // *********** Send OTP Service *********** //
  sendOtp: async (userData) => {
    return (await AdminAPI.post("/send-otp", userData)).data;
  },

  // *********** Resend OTP Service *********** //
  resendOtp: async (userData) => {
    return (await AdminAPI.post("/resend-otp", userData)).data;
  },

  // *********** Verify OTP Service *********** //
  verifyOtp: async (otpData) => {
    return (await AdminAPI.put("/otp-verification", otpData)).data;
  },

  // *********** Login Service *********** //
  loginWithPassword: async (loginData) => {
    return (await AdminAPI.post("/user-login", loginData)).data;
  },

  // *********** Logout Service *********** //
  logout: () => {
    localStorage.removeItem("auth_token");
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },
};
