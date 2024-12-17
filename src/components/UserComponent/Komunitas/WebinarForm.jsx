import React, { useState } from "react";
import Swal from "sweetalert2";

const WebinarForm = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    pekerjaan: "",
    motivasi: "",
    syarat: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // Menampilkan SweetAlert2
    Swal.fire({
      title: "Formulir Berhasil Dikirim!",
      text: "Terima kasih telah mendaftar. Kami akan menghubungi Anda segera.",
      icon: "success",
      confirmButtonText: "OK",
    });

    // Opsional: Kosongkan form setelah dikirim
    setFormData({
      nama: "",
      email: "",
      telepon: "",
      pekerjaan: "",
      motivasi: "",
      syarat: false,
    });
  };

  return (
    <div className="relative flex justify-center items-center w-full -mt-72 pb-16">
      <div className="w-full max-w-7xl sm:px-0 px-8">
        <h1 className="text-2xl sm:text-5xl font-semibold text-center sm:mb-24 mb-16 font-montserrat">
          DAFTARKAN DIRI ANDA SEKARANG!!
        </h1>
        <h1 className="text-2xl font-medium text-left mb-8 font-montserrat">
          Form Pendaftaran:
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Lengkap */}
          <div>
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-[#303030] font-montserrat"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="mt-1 p-4 block w-full rounded-md border-2 border-[#303030] shadow-sm"
              placeholder="Masukkan Nama Lengkap Anda"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#303030] font-montserrat"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-4 block w-full rounded-md border-2 border-[#303030] shadow-sm"
              placeholder="Masukkan Email Aktif"
              required
            />
          </div>

          {/* Nomor Telepon */}
          <div>
            <label
              htmlFor="telepon"
              className="block text-sm font-medium text-[#303030] font-montserrat"
            >
              Nomor Telepon / WhatsApp
            </label>
            <input
              type="number"
              id="telepon"
              name="telepon"
              value={formData.telepon}
              onChange={handleChange}
              className="mt-1 p-4 block w-full rounded-md border-2 border-[#303030] shadow-sm"
              placeholder="Masukkan Nomor yang bisa dihubungi"
              required
            />
          </div>

          {/* Pekerjaan */}
          <div>
            <label
              htmlFor="pekerjaan"
              className="block text-sm font-medium text-[#303030] font-montserrat"
            >
              Pekerjaan
            </label>
            <input
              type="text"
              id="pekerjaan"
              name="pekerjaan"
              value={formData.pekerjaan}
              onChange={handleChange}
              className="mt-1 p-4 block w-full rounded-md border-2 border-[#303030] shadow-sm"
              placeholder="Masukkan Pekerjaan Anda"
              required
            />
          </div>

          {/* Motivasi */}
          <div>
            <label
              htmlFor="motivasi"
              className="block text-sm font-medium text-[#303030] font-montserrat"
            >
              Motivasi Mengikuti Webinar
            </label>
            <textarea
              id="motivasi"
              name="motivasi"
              rows="3"
              value={formData.motivasi}
              onChange={handleChange}
              className="mt-1 p-4 block w-full rounded-md border-2 border-[#303030] shadow-sm"
              placeholder="Apa alasan Anda mengikuti webinar ini"
              required
            ></textarea>
          </div>

          {/* Syarat */}
          <div className="flex items-start justify-start">
            <input
              type="checkbox"
              id="syarat"
              name="syarat"
              checked={formData.syarat}
              onChange={handleChange}
              className="mt-1 p-4 block  rounded-md border-2 border-[#303030] shadow-sm"
              required
            />
            <label
              htmlFor="syarat"
              className="ml-2 text-sm text-gray-600 font-montserrat"
            >
              Saya Menyatakan Setuju dengan{" "}
              <a href="#" className="text-green-500 underline font-montserrat">
                Syarat & Ketentuan
              </a>
            </label>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full bg-[#269D26] text-white text-center py-2 px-4 rounded-md text-lg font-medium hover:bg-green-600 transition font-montserrat"
          >
            DAFTAR SEKARANG
          </button>
        </form>
      </div>
    </div>
  );
};

export default WebinarForm;
