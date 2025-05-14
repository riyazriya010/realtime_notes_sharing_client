"use client"
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link';
import userApis from '@/app/api/userApis';
import { AxiosError } from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface UserSignUpCredetials {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string
}

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<UserSignUpCredetials>()

    const formSubmit: SubmitHandler<UserSignUpCredetials> = async (data: UserSignUpCredetials) => {
        try {
            const response = await userApis.signUp(data)
            console.log('signup response: ', response)
            if(response.success){
                toast.success(response.message)
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error && error.response?.status === 401) {
                    toast.error(error.response?.data?.message)
                }
                if (error && error.response?.status === 403) {
                    toast.warn(error.response?.data?.message)
                }
                if (error && error.response?.status === 409) {
                    toast.warn(error.response?.data?.message)
                }
            }
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-body-bg">
                <ToastContainer
                    autoClose={2000}
                    pauseOnHover={false}
                    transition={Slide}
                    hideProgressBar={false}
                    closeOnClick={false}
                    pauseOnFocusLoss={true}
                />
                <div className="bg-orange-100 w-[400px] p-6 rounded shadow">
                    <h3 className="text-center text-2xl">SginUp</h3>
                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(formSubmit)}>
                        {/* Username */}
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input
                                type="username"
                                id="username"
                                className="bg-gray-50 border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="enter your username"
                                {...register("username", {
                                    required: "Username Required",
                                    pattern: {
                                        value: /^[A-Za-z][A-Za-z0-9]*(?:\s[A-Za-z][A-Za-z0-9]*)*$/,
                                        message: "User Name must start with a letter and contain only single spaces",
                                    }
                                })}
                            />
                        </div>
                        <p className='text-red-600'>{errors.username?.message}</p>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="enter your email"
                                {...register("email", {
                                    required: "Email Required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address"
                                    }
                                })}
                            />
                        </div>
                        <p className='text-red-600'>{errors.email?.message}</p>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="enter your password"
                                {...register("password", {
                                    required: "Password Required",
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+~`|}{[\]:;?><,./-]).{8,}$/,
                                        message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
                                    }
                                })}
                            />
                            <p className="text-red-600">{errors.password?.message}</p>
                        </div>
                        <button
                            type="submit"
                            className="mx-auto block text-white bg-orange-200 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center">
                            Submit
                        </button>
                    </form>
                    <div className='flex justify-center mt-3 gap-3'>
                        <p className='text-stone-400'>Already have account ?</p>
                        <Link href="/pages/user-login" className='underline'>Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}