"use client"
import userApis from '@/app/api/userApis';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';

export interface UserLoginCredetials {
    email: string;
    password: string;
}

export default function Login() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm<UserLoginCredetials>()

    const formSubmit: SubmitHandler<UserLoginCredetials> = async (data: UserLoginCredetials) => {
        try {
            const response = await userApis.login(data)
            console.log('login response : ', response)
            if (response?.success) {
                dispatch(
                    setUser({
                        _id: response?.result._id,
                        username: response.result.username,
                        email: response.result.email
                    })
                )
                toast.success(response.message)
                setTimeout(() => {
                    router.replace('/pages/home');
                }, 2000)
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error && error.response?.status === 401) {
                    toast.error(error.response?.data?.message)
                }
                if (error && error.response?.status === 403) {
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
                    <h3 className="text-center text-2xl">SginIn</h3>
                    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(formSubmit)}>
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
                            Login
                        </button>
                    </form>
                    <div className='flex justify-center mt-3 gap-3'>
                        <p className='text-stone-400'>Dont have account ?</p>
                        <Link href="/pages/signup" className='underline'>Signup</Link>
                    </div>
                </div>
            </div>
        </>
    )
}