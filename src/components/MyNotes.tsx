"use client";

import userApis from "@/app/api/userApis";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function MyNotes() {
    const user = useAppSelector((state) => state.user);
    const router = useRouter();
    const [notes, setNotes] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userApis.getAllNotes(user._id);
                if (response?.data?.result) {
                    setNotes(response.data.result);
                }
            } catch (error) {
                console.error("Error fetching notes", error);
            }
        };
        fetchData();
    }, [user._id]);

    const handleView = (noteId: string) => {
        router.push(`/pages/notes?notesId=${noteId}`);
    };

    const createNotes = () => {
        router.push(`/pages/notes?create=true`);
    };

    return (
        <div className="min-h-screen bg-body-bg p-6 flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-6">Your Notes</h1>

            <div className="flex gap-4 mb-6">
                <button
                    className="bg-stone-700 py-3 px-6 rounded text-white hover:bg-stone-800"
                    onClick={createNotes}
                >
                    Create Note
                </button>
                <button
                    className="bg-stone-500 py-3 px-6 rounded text-white hover:bg-stone-600"
                    onClick={() => router.push("/pages/home")}
                >
                    Go to Home
                </button>
            </div>

            {/* Scrollable Notes Section only */}
            <div className="w-full max-w-xl border border-gray-200 rounded-lg shadow p-4">
                <div className="max-h-[400px] overflow-y-auto space-y-4">
                    {notes.length === 0 ? (
                        <p className="text-gray-500 text-center">No notes found.</p>
                    ) : (
                        notes.map((note) => {
                            const isOwner = note.createdBy === user._id;

                            return (
                                <div
                                    key={note._id}
                                    className="flex justify-between items-center bg-white rounded-lg shadow-sm p-4"
                                >
                                    <div>
                                        <h2 className="text-lg font-semibold">{note.title}</h2>
                                        <p className="text-sm text-gray-600">
                                            {isOwner ? "Owner" : "Shared with me"}
                                        </p>
                                    </div>
                                    <button
                                        className="bg-stone-600 hover:bg-stone-700 text-white px-4 py-2 rounded"
                                        onClick={() => handleView(note._id)}
                                    >
                                        View
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
