import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Swal from "sweetalert2"; // Import SweetAlert2

const EditProduct = () => {
  const { productId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [categories, setCategories] = useState([]); // State to store categories
  console.log("Product ID:", productId);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch categories from API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/category`);
        const data = await response.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        Swal.fire("Error", "Unable to load categories", "error");
      }
    };

    fetchCategories();
  }, []);

  // Fetch product data if productId is provided
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/product/${productId}`);
        const data = await response.json();
        console.log("Fetched product data:", data);
        console.log("Images data:", data.images);
        if (data) {
          setName(data.name);
          setDescription(data.description);
          setQuantity(data.quantity);
          setPrice(data.price);
          setCategoryId(data.category_id);
          const images = data.images || [];
          setImage1(images[0]?.image_url || "");
          setImage2(images[1]?.image_url || "");
          setImage3(images[2]?.image_url || "");
          setImage4(images[3]?.image_url || "");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        Swal.fire("Error", "Unable to fetch product details", "error");
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get the token from localStorage
    const role = localStorage.getItem("userRole"); // Get the role from localStorage

    if (!token || role !== "admin") {
      alert("You are not authorized to edit a product.");
      return;
    }

    // Create the product object to send in the API request
    const updatedProduct = {
      name,
      description,
      price,
      quantity,
      category_id: categoryId,
      images: [image1, image2, image3, image4].filter(Boolean), // Send non-empty images
    };

    try {
      // Send the request to the API to update the product
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in header
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        // If successful, show success message
        Swal.fire("Success!", "Product has been updated.", "success");
      } else {
        Swal.fire("Error", "Failed to update product.", "error");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire(
        "Error",
        "An error occurred while updating the product.",
        "error"
      );
    }
  };

  return (
    <div className="p-6 bg-[#F4F5F9] h-full">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 rounded-lg border"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={name || "Enter product name"}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-4 py-2 rounded-lg border"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="w-full px-4 py-2 rounded-lg border"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="w-full px-4 py-2 rounded-lg border"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block">
            Category
          </label>
          <select
            id="categoryId"
            className="w-full px-4 py-2 rounded-lg border"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="image1" className="block">
            Image 1 (URL)
          </label>
          <input
            type="text"
            id="image1"
            className="w-full px-4 py-2 rounded-lg border"
            value={image1}
            onChange={(e) => setImage1(e.target.value)}
            placeholder="Enter image URL"
          />
          {image1 && (
            <div className="mt-2">
              <img
                src={image1}
                alt="Image 1 preview"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="image2" className="block">
            Image 2 (URL)
          </label>
          <input
            type="text"
            id="image2"
            className="w-full px-4 py-2 rounded-lg border"
            value={image2}
            onChange={(e) => setImage2(e.target.value)}
            placeholder="Enter image URL"
          />
          {image2 && (
            <div className="mt-2">
              <img
                src={image2}
                alt="Image 2 preview"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="image3" className="block">
            Image 3 (URL)
          </label>
          <input
            type="text"
            id="image3"
            className="w-full px-4 py-2 rounded-lg border"
            value={image3}
            onChange={(e) => setImage3(e.target.value)}
            placeholder="Enter image URL"
          />
          {image3 && (
            <div className="mt-2">
              <img
                src={image3}
                alt="Image 3 preview"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="image4" className="block">
            Image 4 (URL)
          </label>
          <input
            type="text"
            id="image4"
            className="w-full px-4 py-2 rounded-lg border"
            value={image4}
            onChange={(e) => setImage4(e.target.value)}
            placeholder="Enter image URL"
          />
          {image4 && (
            <div className="mt-2">
              <img
                src={image4}
                alt="Image 4 preview"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#269D26] text-white rounded-lg shadow-lg hover:scale-105"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
