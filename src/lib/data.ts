import axios, { type AxiosInstance } from "axios";
import type {
  RegisterRequest,
  ArchiveNoteResponse,
  CreateNoteRequest,
  CreateNoteResponse,
  DeleteNoteResponse,
  GetNoteResponse,
  GetNotesResponse,
  GetUserResponse,
  LoginRequest,
  LoginResponse,
  RegisterResponse,
  UnarchiveNoteResponse,
} from "../types/types";

const BASE_URL = "https://notes-api.dicoding.dev/v1";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Register
export const registerUser = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>("/register", data);
  return response.data;
};

// Login
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/login", data);

  if (response.data.data.accessToken) {
    localStorage.setItem("accessToken", response.data.data.accessToken);
  }

  return response.data;
};

// Logout
export const logoutUser = (): void => {
  localStorage.removeItem("accessToken");
};

// Get User logged in
export const getCurrentUser = async (): Promise<GetUserResponse> => {
  const response = await apiClient.get<GetUserResponse>("/users/me");
  return response.data;
};

// Create note
export const createNote = async (
  data: CreateNoteRequest,
): Promise<CreateNoteResponse> => {
  const response = await apiClient.post<CreateNoteResponse>("/notes", data);
  return response.data;
};

// Get notes (non-archived)
export const getNotes = async (): Promise<GetNotesResponse> => {
  const response = await apiClient.get<GetNotesResponse>("/notes");
  return response.data;
};

// Get archived notes
export const getArchivedNotes = async (): Promise<GetNotesResponse> => {
  const response = await apiClient.get<GetNotesResponse>("/notes/archived");
  return response.data;
};

// Get single note
export const getNoteById = async (noteId: string): Promise<GetNoteResponse> => {
  const response = await apiClient.get<GetNoteResponse>(`/notes/${noteId}`);
  return response.data;
};

// Archive note
export const archiveNote = async (
  noteId: string,
): Promise<ArchiveNoteResponse> => {
  const response = await apiClient.post<ArchiveNoteResponse>(
    `/notes/${noteId}/archive`,
  );
  return response.data;
};

// Unarchive note
export const unarchiveNote = async (
  noteId: string,
): Promise<UnarchiveNoteResponse> => {
  const response = await apiClient.post<UnarchiveNoteResponse>(
    `/notes/${noteId}/unarchive`,
  );
  return response.data;
};

// Delete note
export const deleteNote = async (
  noteId: string,
): Promise<DeleteNoteResponse> => {
  const response = await apiClient.delete<DeleteNoteResponse>(
    `/notes/${noteId}`,
  );
  return response.data;
};

// helper
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('accessToken');
};

// Get access token
export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};


export default apiClient;
