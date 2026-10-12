import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  throw new Error("VITE_API_URL is not set. Copy .env.example to .env and restart Vite.");
}

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const getOrchids = () => api.get("/");
export const getOrchid = (id) => api.get(`/${id}`);
export const createOrchid = (orchid) => api.post("/", orchid);
export const updateOrchid = (id, orchid) => api.put(`/${id}`, orchid);
export const deleteOrchid = (id) => api.delete(`/${id}`);

export function getApiErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) return error.response.data.message;
    if (error.response) return `Request failed with status ${error.response.status}.`;
    if (error.request) return "The API could not be reached. Check the backend and VITE_API_URL.";
  }
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}
