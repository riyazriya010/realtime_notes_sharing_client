'use client'

import Link from "next/link";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../redux/store"

interface Props {
  id?: string | null
}

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function LandingPage({ id }: Props) {
  const username = useAppSelector(state => state.user.username)
  return (
    <>
      <div className="h-screen bg-body-bg">

        <div className="flex flex-wrap w-full items-center justify-around gap-[30vw]">
          <h1 className="text-stone-600 text-center py-10 text-5xl">Share Notes</h1>
          {
            id ? (<h1>Welcome - {username}</h1>)
              : (<Link href="/pages/user-login">
                <button className="bg-red-400 text-white px-6 py-2 rounded-full hover:bg-red-600 transition">
                  Login
                </button>
              </Link>)
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
              Whether you're studying, planning, or brainstorming — stay in sync, always.</p>
          </div>
        </div>

      </div>
    </>
  );
}
