import React, { useState } from "react";
import { login } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InputField from "./Input/input";
import ButtonLoginAndRegister from "./Button/ButtonLoginAndRegister";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      setAuthData(data.token, data.user);

      // Simpan role ke local storage
      localStorage.setItem("userRole", data.user.role);

      // Redirect berdasarkan role
      if (data.user.role === "admin") {
        // Redirect ke project admin
        navigate("/admin/dashboard"); // Ganti dengan URL project admin
      } else if (data.user.role === "user") {
        // Redirect ke halaman beranda user
        navigate("/beranda");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Role tidak valid!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <section className="">
      <div className="relative min-h-screen">
        <img
          alt=""
          src="Images/background_auth.png"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="bg-white p-8 shadow-2xl rounded-lg max-w-lg w-full ">
            <h2 className="mt-6 text-2xl font-bold text-start text-[#303030] sm:text-3xl font-mulish">
              Selamat datang!!
            </h2>
            <p className="mt-1 text-start text-[#303030] font-mulish">
              Masuk untuk melanjutkan
            </p>
            <img
              src="../../../public/Images/auth/image_form_auth.png"
              alt="Logo"
              className="mx-auto w-40 h-40"
            />
            <form
              className="mt-8 grid grid-cols-4 gap-6"
              onSubmit={handleSubmit}
            >
              <InputField
                label="Alamat Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                placeholder="Masukan alamat email"
              />

              <InputField
                label="Kata sandi"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                placeholder="Masukan kata sandi"
              />

              <ButtonLoginAndRegister
                textButton="Masuk"
                textArea="Belum punya akun? "
                textHref="Daftar sekarang"
                hrefClick="/register"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
