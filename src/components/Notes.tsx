"use client";

import userApis from "@/app/api/userApis";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from "@/utils/socket";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export interface CreateNotes {
  title: string;
  content: string;
}

interface NotesData {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  collaborators?: { userId: string; permission: 'read' | 'write' }[];
  lastUpdated?: string;
  updatedAt: string;
}

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Notes() {
  const user = useAppSelector((state) => state.user);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [notes, setNotes] = useState<NotesData | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notesId, setNotesId] = useState('');
  const [isCreate, setIsCreate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('read');
  const [email, setEmail] = useState('');

  const isOwner = notes?.createdBy === user._id;
  const collaborator = notes?.collaborators?.find(c => c.userId === user._id);
  const hasWritePermission = collaborator?.permission === 'write';
  // const hasReadPermission = collaborator?.permission === 'read';

  const fetchData = async (id: string) => {
    try {
      const response = await userApis.getNotes(id);
      if (response.success) {
        setNotes(response.result);
        setTitle(response.result.title);
        setContent(response.result.content);
        setNotesId(response.result._id);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    const create = searchParams.get('create');
    const notesIdFromParam = searchParams.get('notesId');

    if (create) {
      setIsCreate(Boolean(create));
    } else if (notesIdFromParam) {
      setIsCreate(false);
      fetchData(notesIdFromParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const notifyUpdate = (data: any) => {
      if (data.notesId === notesId && data.userId !== user._id) {
        toast.success('Your team updated the document');
        fetchData(data.notesId);
      }
    };

    socket.on('updating', notifyUpdate);
    return () => {
      socket.off('updating', notifyUpdate);
    };
  }, [notesId, user._id]);

  const handleSave = async () => {
    try {
      const data: CreateNotes = { title, content };
      const response = await userApis.createNotes(data);
      if (response.success) {
        toast.success(response.message);
        setNotes(response.result);
        setIsCreate(false);
        router.replace('/pages/my-notes');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const data = { title, content };
      const response = await userApis.update(data, String(notes?._id));
      if (response.success) {
        setNotes(response.result);
        setTitle(response.result.title);
        setContent(response.result.content);
        socket.emit('update', { notesId: notes?._id, userId: user._id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = async () => {
    try {
      const response = await userApis.share(String(notes?._id), email, selectedOption);
      if (response.success) {
        setNotes(response.result);
        toast.success(response.message);
        setIsModalOpen(false);
        setEmail('');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const isReadOnly = !isCreate && !isOwner && !hasWritePermission;

  return (
    <>
      <ToastContainer
        autoClose={2000}
        pauseOnHover={false}
        transition={Slide}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss={true}
      />

      <div className="relative bg-white min-h-screen">
        {/* Header */}
        <div className="flex justify-between bg-blue-100 p-4">
          <div className="flex ml-4 gap-4">
            <h1>Title:</h1>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-7 w-[300px] border-2 border-stone-300 focus:outline-sky-300"
              readOnly={isReadOnly}
            />
          </div>

          {/* <div className="flex items-center space-x-2 mr-4">
            {users.map((u, index) => (
              <div
                key={index}
                className="bg-violet-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm"
              >
                {u[0].toUpperCase()}
              </div>
            ))}
          </div> */}

          <div className="flex space-x-2 mr-4">
            {isCreate ? (
              <button
                className="bg-sky-500 text-white py-2 px-4 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <>
                {(isOwner || hasWritePermission) && (
                  <button
                    className="bg-sky-500 text-white py-2 px-4 rounded"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                )}
                {isOwner && (
                  <button
                    className="flex gap-3 bg-sky-500 text-white py-2 px-4 rounded"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FaUser size={20} color="black" />
                    <span>Share</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Back to My Notes Button */}
        <div className="p-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded mb-4"
            onClick={() => router.push("/pages/my-notes")}
          >
            ← Back to My Notes
          </button>
        </div>

        {/* Text Area */}
        <div className="p-4">
          <textarea
            value={content}
            placeholder="Start writing your note..."
            rows={15}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder-gray-500"
            readOnly={isReadOnly}
          />
        </div>

        {/* Share Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
              <h2 className="text-lg font-semibold mb-4">Share via Email</h2>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border border-gray-300 p-2 rounded mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="border-2 border-stone-200 mb-3">
                <select
                  className="w-full p-2"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="read">read</option>
                  <option value="write">write</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 text-black py-2 px-4 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-sky-500 text-white py-2 px-4 rounded"
                  onClick={handleShare}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
