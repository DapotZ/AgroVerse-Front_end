import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const Content = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Halaman yang aktif
  const [limit, setLimit] = useState(10); // Produk per halaman
  const [total, setTotal] = useState(0); // Total produk
  const [loading, setLoading] = useState(false); // Loading state
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch product data from the API with pagination
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        const response = await fetch(
          `${API_URL}/product/?page=${page}&limit=${limit}`
        );
        const data = await response.json();

        if (data && data.data) {
          setProducts(data.data); // Set the list of products
          setTotal(data.total); // Set total products count for pagination
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [page, limit]); // Re-fetch data when page or limit changes

  // Function to handle delete action
  const handleDelete = async (productId) => {
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
        const response = await fetch(`${API_URL}/product/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Include token in header
          },
        });

        if (response.ok) {
          // If successful, remove the product from the state
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.product_id !== productId)
          );
          Swal.fire("Deleted!", "The product has been deleted.", "success"); // Success message
        } else {
          Swal.fire("Error", "Failed to delete product.", "error"); // Error message
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire(
          "Error",
          "An error occurred while deleting the product.",
          "error"
        ); // Error message
      }
    }
  };

  const totalPages = Math.ceil(total / limit); // Calculate total pages based on total products and limit

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage); // Update the page state
    }
  };

  return (
    <div className="p-6 flex-1 bg-[#F4F5F9]">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      {/* Button to navigate to the add product form */}
      <a href="/admin/products/addproduct">
        <button className="mb-4 px-4 py-2 bg-[#269D26] text-white rounded-lg shadow-lg hover:scale-105">
          Add Product
        </button>
      </a>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
        <table className="min-w-full table-auto">
          <thead className="bg-[#269D26] text-white">
            <tr>
              <th className="px-6 py-3 text-left">No</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.product_id}>
                  <td className="px-6 py-4">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.category.name}</td>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].image_url}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/products/edit/${product.product_id}`}>
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
                      onClick={() => handleDelete(product.product_id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  No products available
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

export default Content;
