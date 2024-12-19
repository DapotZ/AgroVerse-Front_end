import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Membuat instance Axios untuk API
const api = axios.create({
  baseURL: `${API_URL}/forum`,
});

// Menambahkan interceptor untuk menyisipkan token autentikasi pada setiap permintaan
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage atau sessionStorage
    const token = localStorage.getItem("token"); // Ganti dengan cara penyimpanan token Anda

    // Jika token ada, tambahkan ke header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mengambil semua postingan
export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    if (error.response?.status === 401) {
      alert("Unauthorized access, please login!");
    }
  }
};

// Menambah postingan baru
export const createPost = async (title, content) => {
  try {
    const response = await api.post("/posts/create", { title, content });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    if (error.response?.status === 401) {
      alert("Unauthorized access, please login!");
    }
  }
};

// Memberi like pada postingan
export const likePost = async (postId) => {
  try {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking post:", error);
    if (error.response?.status === 401) {
      alert("Unauthorized access, please login!");
    }
  }
};

// Menambahkan komentar pada postingan
export const addComment = async (postId, content) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, { content });
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    if (error.response?.status === 401) {
      alert("Unauthorized access, please login!");
    }
  }
};

// Mengambil komentar dari postingan
export const getComments = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    if (error.response?.status === 401) {
      alert("Unauthorized access, please login!");
    }
  }
};

export default api;
