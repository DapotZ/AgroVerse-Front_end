import {
  faGaugeHigh,
  faHome,
  faPersonChalkboard,
  faShop,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link dan useLocation

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Untuk hamburger menu
  const location = useLocation(); // Mengambil URL halaman saat ini

  const closeSidebar = () => setIsOpen(false); // Fungsi untuk menutup sidebar

  const isActive = (path) => location.pathname === path; // Fungsi untuk mengecek apakah menu aktif

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        className={`bg-white text-[#303030] h-full w-64 p-4 fixed top-0 left-0 z-40 transform transition-transform duration-300 shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold py-5 mb-10">AGROVERSE</h1>

        {/* Menulis menu items secara manual */}
        <ul className="flex flex-col space-y-4">
          <Link to="/admin/dashboard">
            <li
              className={`cursor-pointer p-2 rounded text-xl font-normal font-montserrat ${
                isActive("/admin/dashboard")
                  ? "bg-[#269D26] text-white" // Menambahkan kelas aktif
                  : "text-black hover:bg-[#269D26]"
              }`}
            >
              <FontAwesomeIcon icon={faGaugeHigh} className="mr-2" />
              Dashboard
            </li>
          </Link>
          <Link to="/admin/users">
            <li
              className={`cursor-pointer p-2 rounded text-xl font-normal font-montserrat ${
                isActive("/admin/users")
                  ? "bg-[#269D26] text-white"
                  : "text-black hover:bg-[#269D26]"
              }`}
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Users
            </li>
          </Link>
          <Link to="/admin/products">
            <li
              className={`cursor-pointer p-2 rounded text-xl font-normal font-montserrat  ${
                isActive("/admin/products")
                  ? "bg-[#269D26] text-white"
                  : "text-black hover:bg-[#269D26]"
              }`}
            >
              <FontAwesomeIcon icon={faShop} className="mr-2" />
              Product
            </li>
          </Link>
          <Link to="/admin/webinar">
            <li
              className={`cursor-pointer p-2 rounded text-xl font-normal font-montserrat ${
                isActive("/admin/webinar")
                  ? "bg-[#269D26] text-white"
                  : "text-black hover:bg-[#269D26]"
              }`}
            >
              <FontAwesomeIcon icon={faPersonChalkboard} className="mr-2" />
              Webinar
            </li>
          </Link>
        </ul>
      </div>

      {/* Tombol Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 text-[#303030] bg-white md:hidden flex items-start h-full shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
          />
        </svg>
      </button>

      {/* Overlay (untuk menutup sidebar saat klik di luar) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
