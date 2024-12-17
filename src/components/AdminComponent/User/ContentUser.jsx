import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const ContentUser = () => {
  const [Users, setUsers] = useState([]);
  const [page, setPage] = useState(1); // Halaman yang aktif
  const [limit, setLimit] = useState(10); // Produk per halaman
  const [total, setTotal] = useState(0); // Total produk
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch webinar data from the API with pagination
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      const role = localStorage.getItem("userRole");

      if (!token || role !== "admin") {
        alert("You are not authorized to delete this product.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/user/?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Kirim token dengan header Authorization
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setUsers(data.users); // Set the user data from the response
        setTotal(data.total); // Set the total count (if provided by your API)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [page, limit]); // Re-fetch data when page or limit changes

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const role = localStorage.getItem("userRole"); // Get the role from localStorage

    if (!token || role !== "admin") {
      alert("You are not authorized to delete this product.");
      return;
    }

    // Use SweetAlert2 for confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${userId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, // Include token in header
            },
          }
        );

        if (response.ok) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.user_id !== userId)
          );
          Swal.fire("Deleted!", "The User has been deleted.", "success"); // Success message
        } else {
          Swal.fire("Error", "Failed to delete User.", "error"); // Error message
        }
      } catch (error) {
        console.error("Error deleting User:", error);
        Swal.fire(
          "Error",
          "An error occurred while deleting the User.",
          "error"
        ); // Error message
      }
    }
  };

  const totalPages = Math.ceil(total / limit); // Calculate total pages based on total Webinar and limit

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage); // Update the page state
    }
  };

  return (
    <div className="p-6 flex-1 bg-[#F4F5F9]">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      {/* Button to navigate to the add webinar form */}
      <a href="/admin/users/adduser">
        <button className="mb-4 px-4 py-2 bg-[#269D26] text-white rounded-lg shadow-lg hover:scale-105">
          Add User
        </button>
      </a>

      {/* Webinar Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
        <table className="min-w-full table-auto">
          <thead className="bg-[#269D26] text-white">
            <tr>
              <th className="px-6 py-3 text-left">No</th>
              <th className="px-6 py-3 text-left w-64">Username</th>
              <th className="px-6 py-3 text-left w-72">Email</th>
              <th className="px-6 py-3 text-left w-72">Role</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : Users.length > 0 ? (
              Users.map((user, index) => (
                <tr key={user.user_id}>
                  <td className="px-6 py-4">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/users/edit/${user.user_id}`}>
                      <button className="px-4 py-2 rounded-lg mr-2 bg-[#FFC4004A] text-[#FFC400] hover:scale-105">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="mr-2"
                        />
                        Edit
                      </button>
                    </Link>
                    <button
                      className="px-4 py-2 bg-[#FF00004D] rounded-lg text-[#FF0000] hover:scale-105"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  No User available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-[#269D26] text-white rounded-md mr-2"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-[#269D26] text-white rounded-md ml-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentUser;
