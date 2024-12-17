import React, { useState, useEffect } from "react";
import {
  faPersonChalkboard,
  faShop,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Content = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [webinarCount, setWebinarCount] = useState(0);

  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      const role = localStorage.getItem("userRole");

      if (!token || role !== "admin") {
        alert("You are not authorized to delete this product.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/product/");
        const data = await response.json();
        console.log(data);

        // Get the number of products from the response
        if (data && data.data) {
          setProductCount(data.total); // Set the number of products
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        const response = await fetch("http://localhost:5000/api/webinar");
        const data = await response.json();

        // Get the number of products from the response
        if (data && data.webinar) {
          setWebinarCount(data.webinar.length); // Set the number of products
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await fetch(`http://localhost:5000/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`, // Kirim token dengan header Authorization
          },
        });
        const data = await response.json();
        console.log(data);
        if (data && data.users) {
          setUserCount(data.users.length); // Set the number of products
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="p-6 flex-1 bg-[#F4F5F9]">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Card Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <a href="/admin/users" className="hover:scale-105">
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total User</p>
              <p className="text-3xl font-bold">{userCount}</p>
            </div>
            <div className="text-4xl text-[#269D26]">
              <FontAwesomeIcon icon={faUsers} />
            </div>
          </div>
        </a>

        <a href="/admin/products" className="hover:scale-105">
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center justify-between">
            <div>
              <p className="text-gray-500">Product</p>
              <p className="text-3xl font-bold">{productCount}</p>
            </div>
            <div className="text-4xl text-[#269D26]">
              <FontAwesomeIcon icon={faShop} />
            </div>
          </div>
        </a>

        <a href="/admin/webinar" className="hover:scale-105">
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center justify-between">
            <div>
              <p className="text-gray-500">Webinar</p>
              <p className="text-3xl font-bold">{webinarCount}</p>
            </div>
            <div className="text-4xl text-[#269D26]">
              <FontAwesomeIcon icon={faPersonChalkboard} />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Content;
