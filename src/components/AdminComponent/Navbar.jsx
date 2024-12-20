import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLogoutDropdownOpen, setIsLogoutDropdownOpen] = useState(false);
  const { authData, clearAuth } = useAuth();

  // Ref untuk dropdown Profile dan Logout
  const profileDropdownRef = useRef(null);
  const logoutDropdownRef = useRef(null);

  // Fungsi untuk men-toggle dropdown
  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const toggleLogoutDropdown = () =>
    setIsLogoutDropdownOpen(!isLogoutDropdownOpen);

  // Menutup dropdown jika klik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        logoutDropdownRef.current &&
        !logoutDropdownRef.current.contains(event.target)
      ) {
        setIsLogoutDropdownOpen(false);
      }
    };

    // Menambahkan event listener ketika component dimount
    document.addEventListener("mousedown", handleClickOutside);

    // Membersihkan event listener ketika component di-unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    clearAuth();
    window.location.href = "/login";
  };

  return (
    <div className="bg-[#FFFEFE] text-white px-4 py-3 flex justify-between items-center shadow-xl">
      <div className="flex items-center">
        <a className="block text-teal-600 " href="#">
          <span className="sr-only">Home</span>
          <img src="/Images/Logo.png" className="h-20 w-auto" alt="" />
        </a>
        <p className="text-xl font-bold text-hijau font-montserrat sm:text-2xl hidden md:block">
          AGROVERSE
        </p>
      </div>
      <div className="space-x-4 flex items-center text-[#6D6D6D]">
        {/* Logout Dropdown */}
        <div className="relative" ref={logoutDropdownRef}>
          <button
            onClick={toggleLogoutDropdown}
            className="px-4 py-2 flex justify-center items-center gap-2"
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {isLogoutDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#6D6D6D] text-black rounded shadow-lg">
              <ul className="space-y-2 p-2">
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-600 text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
