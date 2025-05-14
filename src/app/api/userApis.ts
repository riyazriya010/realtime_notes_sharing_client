import { UserLoginCredetials } from "@/components/Login";
import { UserSignUpCredetials } from "@/components/Signup";
import axiosInstance from "@/lib/security/axiosInstance";
import { LoginResponse, SignUpResponse, UserLogin, UserSignup } from "@/types/user";
import { USER_SERVICE } from "@/utils/constants";

const userApis = {
    login: async (data: UserLoginCredetials): Promise<LoginResponse> => {
        try {
            const response = await axiosInstance.post(`${USER_SERVICE}/login`, data)
            return response.data
        } catch (error: unknown) {
            throw error
        }
    },

    signUp: async (data: UserSignUpCredetials): Promise<SignUpResponse> => {
        try {
            const response = await axiosInstance.post(`${USER_SERVICE}/signup`, data)
            return response.data
        } catch (error: unknown) {
            throw error
        }
    }
}

export default userApis;
