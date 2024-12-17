import React, { useState } from "react";
import { register } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InputField from "./Input/input";
import ButtonLoginAndRegister from "./Button/ButtonLoginAndRegister";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register({ username, email, password });
      Swal.fire({
        title: "Success!",
        text: data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/login");
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
    <>
      <section className="">
        <div className="relative min-h-screen">
          <img
            alt=""
            src="../../../public/Images/background_auth.png"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative z-10 flex items-center justify-center min-h-screen ">
            <div className="bg-white p-8 shadow-2xl rounded-lg max-w-lg w-full ">
              <h2 className="mt-6 text-2xl font-bold text-start text-[#303030] sm:text-3xl font-mulish">
                Daftar
              </h2>
              <p className="mt-1 text-start text-[#303030] font-mulish">
                Buat Akun Baru
              </p>
              <form
                className="mt-8 grid grid-cols-4 gap-6"
                onSubmit={handleSubmit}
              >
                <InputField
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="Username"
                  name="username"
                  placeholder="Masukkan Username"
                />

                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="Email"
                  name="email"
                  placeholder="Masukan alamat email"
                />

                <InputField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="Password"
                  name="password"
                  placeholder="Masukan kata sandi"
                />

                <ButtonLoginAndRegister
                  textButton="Buat akun"
                  textArea="Sudah punya akun? "
                  textHref="Masuk"
                  hrefClick="/login"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
