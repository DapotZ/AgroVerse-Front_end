import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Swal from "sweetalert2"; // Import SweetAlert2

const EditUser = () => {
  const { userId } = useParams(); // Mendapatkan ID pengguna dari URL parameter
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      const userRole = localStorage.getItem("userRole"); // Ambil role dari localStorage

      if (!token || userRole !== "admin") {
        alert("You are not authorized to edit this user.");
        return;
      }

      try {
        // Mengambil data pengguna berdasarkan userId dengan otorisasi
        const response = await fetch(`${API_URL}/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Sertakan token di header
          },
        });

        if (!response.ok) {
          // Jika server mengembalikan status error
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log(data);

        if (data) {
          setUsername(data.username); // Mengatur state dengan data yang didapat
          setEmail(data.email);
          setRole(data.role);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        Swal.fire("Error", "Unable to fetch user details", "error");
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);
  // Menjalankan fetchUser hanya ketika userId berubah

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    const roles = localStorage.getItem("userRole"); // Ambil role dari localStorage

    if (!token || roles !== "admin") {
      alert("You are not authorized to edit a user.");
      return;
    }

    // Membuat objek user yang akan dikirimkan ke API
    const updatedUser = {
      username,
      email,
      role,
    };

    try {
      // Mengirim permintaan PUT untuk memperbarui data pengguna
      const response = await fetch(`${API_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Sertakan token di header
        },
        body: JSON.stringify(updatedUser), // Kirim data dalam format JSON
      });

      if (response.ok) {
        // Jika berhasil, tampilkan pesan sukses
        Swal.fire("Success!", "User has been updated.", "success");
      } else {
        Swal.fire("Error", "Failed to update user.", "error");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error", "An error occurred while updating the user.", "error");
    }
  };

  return (
    <div className="p-6 bg-[#F4F5F9] h-full">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-2 rounded-lg border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 rounded-lg border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block">
            Role
          </label>
          <select
            id="role"
            className="w-full px-4 py-2 rounded-lg border"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#269D26] text-white rounded-lg shadow-lg hover:scale-105"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
