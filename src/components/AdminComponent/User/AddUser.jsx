import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddUserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const userRole = localStorage.getItem("userRole"); // Get the role from localStorage

    if (!token || userRole !== "admin") {
      alert("You are not authorized to add a user.");
      return;
    }

    // Create the user object to send in the API request
    const newUser = {
      username,
      email,
      password,
      role,
    };

    try {
      // Send the request to the API to add the user
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in header for authentication
        },
        body: JSON.stringify(newUser), // Send user data as JSON
      });

      if (response.ok) {
        // If successful, show success message
        Swal.fire("Success!", "User has been added.", "success");
      } else {
        Swal.fire("Error", "Failed to add user.", "error");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      Swal.fire("Error", "An error occurred while adding the user.", "error");
    }
  };

  return (
    <div className="p-6 bg-[#F4F5F9] h-full">
      <h2 className="text-2xl font-bold mb-4">Add User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">
            Username
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 rounded-lg border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 rounded-lg border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block">
            Password
          </label>
          <input
            type="password"
            id="quantity"
            className="w-full px-4 py-2 rounded-lg border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block">
            Role
          </label>
          <select
            id="categoryId"
            className="w-full px-4 py-2 rounded-lg border"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#269D26] text-white rounded-lg shadow-lg hover:bg-green-700"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
