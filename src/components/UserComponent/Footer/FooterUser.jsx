import React from "react";
import {
  faXTwitter,
  faInstagram,
  faTiktok,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const FooterUser = () => {
  return (
    <footer className="bg-[#1E7431]">
      <div className="flex flex-col items-center sm:justify-around gap-8 px-4 py-8 sm:flex-row">
        {/* Bagian Kontak */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
          <p className="text-sm text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faPhone} />
            +6288-231-123
          </p>
          <p className="text-sm text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} />
            gadgetout@gmail.com
          </p>
        </div>

        {/* Bagian Alamat */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg font-bold text-white mb-4">Alamat</h4>
          <p className="text-sm text-white">
            Jl. WR Supratman No. 233,
            <br />
            Kesiman Petilan, Kec. Denpasar Tim.,
            <br />
            Kota Denpasar, Bali 80113
          </p>
        </div>

        {/* Bagian Ikon Sosial dan Google Play */}
        <div className="text-center sm:text-right">
          <div className="flex justify-center sm:justify-end gap-4 mb-4">
            <a href="#" className="text-white text-lg hover:opacity-75">
              <FontAwesomeIcon icon={faXTwitter} />
              {/* Replace with proper icon */}
            </a>
            <a href="#" className="text-white text-lg hover:opacity-75">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="text-white text-lg hover:opacity-75">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="text-white text-lg hover:opacity-75">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </div>
          <a href="#">
            <img
              src="/Images/footer/googleplay.png"
              alt="Get it on Google Play"
              className="w-32 mx-auto sm:mx-0"
            />
          </a>
        </div>
      </div>

      {/* Bagian Footer Bawah */}
      <div className="py-4 sm:px-20 w-full bg-[#269D26]">
        <div className="sm:flex sm:items-center sm:justify-end flex justify-center items-center">
          <ul className="flex flex-wrap gap-4 text-xs">
            <li>
              <a href="#" className="text-white transition hover:opacity-75">
                Care Instruction
              </a>
            </li>
            <li>
              <a href="#" className="text-white transition hover:opacity-75">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-white transition hover:opacity-75">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterUser;
