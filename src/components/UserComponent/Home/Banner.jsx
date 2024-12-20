import React from "react";

const Banner = () => {
  return (
    <section className="relative">
      {/* Background image with filter */}
      <div className="absolute inset-0 bg-[url('/Images/hero.png')] bg-cover bg-center filter brightness-[0.6] z-0"></div>

      {/* Teks berada di atas gambar */}
      <div className="relative z-10 mx-auto max-w-screen-xl lg:flex lg:h-screen lg:items-center px-4 py-4">
        <div className="mx-auto max-w-xl text-center text-white">
          <h1 className="text-2xl font-extrabold sm:text-4xl font-monsterrat">
            Belajar merawat tanaman bersama kami
          </h1>

          <p className="mt-4 sm:text-lg/relaxed font-poppins font-semibold text-sm">
            Jelajahi dunia tanaman hias dan temukan tips, panduan, serta
            informasi terbaru untuk merawat dan memperindah ruangan Anda dengan
            berbagai jenis tanaman.
          </p>
          <p className="sm:text-lg/relaxed font-poppins font-semibold text-sm">
            Apakah Anda pemula atau pecinta tanaman berpengalaman, kami hadir
            untuk membantu Anda sukses dalam merawat tanaman hias.
          </p>
          <p className="sm:text-lg/relaxed font-poppins font-semibold text-sm">
            🌱 Panduan Merawat Tanaman 🌸 Jenis Tanaman Hias Terpopuler 🪴 Tips
            Mempercantik Ruangan dengan Tanaman
          </p>
          <p className="sm:text-lg/relaxed font-poppins font-semibold text-sm">
            Mari tumbuh bersama di komunitas pecinta tanaman hias!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
