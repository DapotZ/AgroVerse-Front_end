import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const Navbar = () => {
  const { authData, clearAuth } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk mengontrol menu

  const handleLogout = () => {
    clearAuth();
    window.location.href = "/login";
  };

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white relative shadow-xl">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>
              <img src="Images/Logo.png" className="h-20 w-auto" alt="" />
            </a>
            <p className="text-xl font-bold text-hijau font-montserrat sm:text-2xl hidden md:block">
              AGROVERSE
            </p>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center md:gap-12">
            <nav
              aria-label="Global"
              className={`${
                isMenuOpen ? "block" : "hidden"
              } absolute top-full left-0 z-50 w-full bg-white md:relative md:block md:w-auto sm:p-0 p-8`}
            >
              <ul className="flex flex-col md:flex-row items-center gap-6 text-sm font-poppins">
                <li>
                  <a
                    className={`transition hover:text-hijau ${
                      isActive("/beranda") ? "text-hijau" : "text-gray-500"
                    }`}
                    href="/beranda"
                  >
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    className={`transition hover:text-hijau ${
                      isActive("/tentangkami") ? "text-hijau" : "text-gray-500"
                    }`}
                    href="/tentangkami"
                  >
                    Tentang Kami
                  </a>
                </li>

                <li>
                  <a
                    className={`transition hover:text-hijau ${
                      isActive("/komunitas") ? "text-hijau" : "text-gray-500"
                    }`}
                    href="/komunitas"
                  >
                    Komunitas
                  </a>
                </li>
                <li>
                  <a
                    className={`transition hover:text-hijau ${
                      isActive("/belanja") ? "text-hijau" : "text-gray-500"
                    }`}
                    href="/belanja"
                  >
                    Belanja
                  </a>
                </li>

                {/* Tambahkan Tombol Logout di Menu Hamburger */}
                <li className="block md:hidden">
                  <button
                    className="rounded-md bg-hijau px-5 py-2.5 text-sm font-medium text-white shadow"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>

            {/* Logout & Hamburger Menu */}
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4 hidden md:block">
                <button
                  className="rounded-md bg-hijau px-5 py-2.5 text-sm font-medium text-white shadow"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>

              {/* Hamburger Menu */}
              <div className="block md:hidden">
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
