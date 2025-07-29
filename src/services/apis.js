import api from '@/services/api.js'

export const getOtp = async (phone)=>{
  try {
    const response = await api.post("/user-otp", {user_mobile:phone});
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (OTP  ,phone)=>{
  try {
    const response = await api.post("/user-login", {user_mobile:phone , user_otp:OTP});
    return response;
  } catch (error) {
    throw error;
  }
};