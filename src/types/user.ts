
export type UserLogin = {
  _id: string;
  username: string;
  email: string;
  password: string
}

export type UserSignup = {
  _id: string;
  username: string;
  email: string;
  password: string
}

export type CreateNotes = {
  _id: string;
  title: string;
  content: string;
  createdBy: string; // 👈 Add this line
  collaborators?: { userId: string; permission: 'read' | 'write' }[];
  lastUpdated?: string;
  updatedAt: string;
}

export type getNote = {
  _id: string;
  title: string;
  content: string;
  collaborators?: { userId: string; permission: string }[];
  lastUpdatedPerson?: string;
  updatedAt: string;
}


//Response Modal
export type LoginResponse = {
  result: UserLogin;
  message: string;
  success: boolean;
}

export type SignUpResponse = {
  result: UserSignup;
  message: string;
  success: boolean;
}

export type CreateNotesResponse = {
  result: CreateNotes;
  message: string;
  success: boolean;
}

export type NoteGetResponse = {
  result: CreateNotes;
  message: string;
  success: boolean;
}