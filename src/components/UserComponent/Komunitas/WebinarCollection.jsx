import React, { useState, useEffect } from "react";
import axios from "axios";

const WebinarCollection = () => {
  const [webinars, setWebinars] = useState([]);

  // Mengambil data webinar dari API
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .get("http://localhost:5000/api/webinar", {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token ke header Authorization
        },
      })
      .then((response) => {
        setWebinars(response.data.webinar); // Menyimpan data webinar ke state
      })
      .catch((error) => {
        console.error("There was an error fetching the webinar data!", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-8 pb-16 -mt-72">
      <h2 className="text-3xl font-bold sm:text-start text-center mb-24">
        Webinar yang akan datang:
      </h2>
      <div className="grid grid-cols-1 lg:grid-row-3 gap-8">
        {webinars.map((webinar) => (
          <div
            key={webinar.webinar_id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm flex sm:flex-row flex-col items-center p-6 gap-4"
          >
            {/* Gambar */}
            <div className="w-56 h-56 flex-shrink-0">
              <img
                src={webinar.images}
                alt={webinar.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Konten */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold mb-1">{webinar.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{webinar.speaker}</p>
                <p className="text-sm text-gray-600 mb-4">
                  {webinar.description}
                </p>
              </div>

              {/* Tombol */}
              <div className="flex justify-end mt-auto">
                <a
                  href="/komunitas/webinar/form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white text-sm py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Daftar Sekarang
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebinarCollection;
