import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Swal from "sweetalert2"; // Import SweetAlert2

const EditProduct = () => {
  const { webinarId } = useParams();
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [schedule, setSchedule] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.VITE_API_URL}/webinar/${webinarId}`
        );
        const data = await response.json();
        console.log(data.webinar);

        // Pastikan data yang diterima tidak null atau undefined
        if (data.webinar) {
          setTitle(data.webinar.title); // Pastikan nilai default jika data.name tidak ada
          setSpeaker(data.webinar.speaker); // Pastikan nilai default jika data.speaker tidak ada
          setDescription(data.webinar.description); // Pastikan nilai default jika data.description tidak ada
          setImages(data.webinar.images); // Pastikan nilai default jika data.images tidak ada
          setLink(data.webinar.link); // Pastikan nilai default jika data.link tidak ada
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        Swal.fire("Error", "Unable to fetch product details", "error");
      }
    };

    if (webinarId) {
      fetchProduct();
    }
  }, [webinarId]);

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
    const updateWebinar = {
      title,
      speaker,
      description,
      images,
      schedule,
      link,
    };

    try {
      // Send the request to the API to update the product
      const response = await fetch(
        `${process.env.VITE_API_URL}/webinar/${webinarId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in header
          },
          body: JSON.stringify(updateWebinar),
        }
      );

      if (response.ok) {
        // If successful, show success message
        Swal.fire("Success!", "Webinar has been updated.", "success");
      } else {
        Swal.fire("Error", "Failed to update Webinar.", "error");
      }
    } catch (error) {
      console.error("Error updating Webinar:", error);
      Swal.fire(
        "Error",
        "An error occurred while updating the Webinar.",
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
            Title
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 rounded-lg border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={title || "Enter Webinar Title"}
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
            placeholder={speaker || "Enter Webinar Speaker"}
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
            placeholder={description || "Enter Webinar Description"}
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
            placeholder={images || "Enter Webinar Images"}
            required
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
            placeholder={schedule || "Enter Webinar Schedule"}
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
            placeholder={link || "Enter Webinar Link"}
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

export default EditProduct;
