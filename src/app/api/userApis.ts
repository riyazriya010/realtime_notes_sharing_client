import { UserLoginCredetials } from "@/components/Login";
import { CreateNotes } from "@/components/Notes";
import { UserSignUpCredetials } from "@/components/Signup";
import axiosInstance from "@/lib/security/axiosInstance";
import { CreateNotesResponse, LoginResponse, NoteGetResponse, SignUpResponse } from "@/types/user";
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
    },

    createNotes: async (data: CreateNotes): Promise<CreateNotesResponse> => {
        try {
            const response = await axiosInstance.post(`${USER_SERVICE}/create/notes`, data)
            return response.data
        } catch (error: unknown) {
            throw error
        }
    },

    getNotes: async (id: string): Promise<NoteGetResponse> => {
        try {
            const response = await axiosInstance.get(`${USER_SERVICE}/get/notes?notesId=${id}`)
            return response.data
        } catch (error: unknown) {
            throw error
        }
    },

    update: async (data: { title: string, content: string }, id: string): Promise<NoteGetResponse> => {
        try {
            const response = await axiosInstance.patch(`${USER_SERVICE}/edit/note?noteId=${id}`, data)
            return response.data
        } catch (error: unknown) {
            throw error
        }
    },

    share: async (noteId: string, email: string, permission: string): Promise<NoteGetResponse> => {
        try {
            const response = await axiosInstance.patch(`${USER_SERVICE}/share/note?noteId=${noteId}&email=${email}&permission=${permission}`)
            return response.data
        } catch (error: unknown) {
            throw error
        }
    },

    getAllNotes: async (userId: string): Promise<any> => {
        try {
            const response = await axiosInstance.get(`${USER_SERVICE}/get/all-notes?userId=${userId}`)
            return response
        } catch (error: unknown) {
            throw error
        }
    }

}

export default userApis;
