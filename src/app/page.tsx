'use client'

import Link from "next/link";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../redux/store"
import userApis from "./api/userApis";
import { useRouter } from "next/navigation";



const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function LandingPage() {
  const username = useAppSelector(state => state.user.username)
  const router = useRouter()

  const handleLogout = async () => {
    const response = await userApis.logout()
    if (response.data.success) {
      localStorage.clear()
      router.replace('/pages/user-login')
    }
  };

  return (
    <>
      <div className="h-screen bg-body-bg">

        <div className="flex flex-wrap w-full items-center justify-around gap-[30vw]">
          <h1 className="text-stone-600 text-center py-10 text-5xl">Share Notes</h1>
          {
            username ? (
              <div className="flex flex-col items-center space-y-4">
                <h2 className="text-xl font-semibold text-stone-700">Welcome, <span className="text-red-700">{username}</span></h2>
                <Link href="/pages/my-notes">
                  <button className="bg-red-500 text-white px-8 py-2 rounded-full shadow-md hover:bg-red-600 transition-all duration-300">
                    Go to Notes
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gray-500 text-white px-8 py-2 rounded-full shadow-md hover:bg-gray-600 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            )
              : (
                <Link href="/pages/user-login">
                  <button className="bg-stone-800 text-white px-8 py-2 rounded-full shadow-md hover:bg-stone-900 transition-all duration-300">
                    Login
                  </button>
                </Link>
              )
          }

        </div>


        {/* Content - 1 */}
        <div className="w-[650px] p-5 rounded-full bg-gray-50 ml-5 mt-8">
          <h2 className="text-2xl font-semibold ml-10">Work Together, Write Better.</h2>
          <p className="text-stone-600 ml-10">Experience seamless, secure, and real-time note sharing with role-based access.<br></br>
            Empower your team, classmates, or colleagues to collaborate like never before.</p>
        </div>

        {/* Content - 2 */}
        <div className="flex justify-end mt-8 mr-5">
          <div className="w-[650px] p-5 rounded-full bg-gray-50">
            <h2 className="text-2xl font-semibold ml-10">Collaborate Smarter, Share Freely</h2>
            <p className="text-stone-600 ml-10">Unlock the power of real-time collaboration with smart note sharing.<br></br>
              Control who can view or edit your notes with role-based permissions.<br></br>
              Whether youre studying, planning, or brainstorming — stay in sync, always.</p>
          </div>
        </div>

      </div>
    </>
  );
}
