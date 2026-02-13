// Auth
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    accessToken: string;
  };
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface GetUserResponse {
  status: string;
  message: string;
  data: User;
}

// Note Types
export interface Note {
  id: string;
  title: string;
  body: string;
  owner: string;
  archived: boolean;
  createdAt: string;
}

export interface CreateNoteRequest {
  title: string;
  body: string;
}

export interface CreateNoteResponse {
  status: string;
  message: string;
  data: Note;
}

export interface GetNotesResponse {
  status: string;
  message: string;
  data: Note[];
}

export interface GetNoteResponse {
  status: string;
  message: string;
  data: Note;
}

export interface ArchiveNoteResponse {
  status: string;
  message: string;
}

export interface UnarchiveNoteResponse {
  status: string;
  message: string;
}

export interface DeleteNoteResponse {
  status: string;
  message: string;
}
