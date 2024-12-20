import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddWebinarForm = () => {
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [images, setImages] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("");
  const [link, setLink] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Get the token from localStorage
    const role = localStorage.getItem("userRole"); // Get the role from localStorage

    if (!token || role !== "admin") {
      alert("You are not authorized to add a product.");
      return;
    }

    // Create the product object to send in the API request
    const newWebinar = {
      title,
      speaker,
      description,
      images,
      schedule,
      link,
    };

    try {
      // Send the request to the API to add the product
      const response = await fetch(`${API_URL}/webinar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in header
        },
        body: JSON.stringify(newWebinar),
      });

      if (response.ok) {
        // If successful, show success message
        Swal.fire("Success!", "Webinar has been added.", "success");
      } else {
        Swal.fire("Error", "Failed to add Webinar.", "error");
      }
    } catch (error) {
      console.error("Error adding Webinar:", error);
      Swal.fire(
        "Error",
        "An error occurred while adding the Webinar.",
        "error"
      );
    }
  };

  return (
    <div className="p-6 bg-[#F4F5F9] h-full">
      <h2 className="text-2xl font-bold mb-4">Add Webinar</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">
            Title
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 rounded-lg border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block">
            Speaker
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 rounded-lg border"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
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
          <label htmlFor="image4" className="block">
            Image
          </label>
          <input
            type="text"
            id="image4"
            className="w-full px-4 py-2 rounded-lg border"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            placeholder="Enter image URL"
          />
          {images && (
            <div className="mt-2">
              <img
                src={images}
                alt="Image 4 preview"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="quantity" className="block">
            Schedule
          </label>
          <input
            type="datetime-local"
            id="quantity"
            className="w-full px-4 py-2 rounded-lg border"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block">
            Link
          </label>
          <input
            type="url"
            id="price"
            className="w-full px-4 py-2 rounded-lg border"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#269D26] text-white rounded-lg shadow-lg hover:bg-green-700"
        >
          Add Webinar
        </button>
      </form>
    </div>
  );
};

export default AddWebinarForm;
