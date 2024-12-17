import React from "react";

const Banner = () => {
  return (
    <section className="relative">
      {/* Background image with filter */}
      <div className="absolute inset-0 bg-[url('../../../public/Images/tentang_kami/background.png')] bg-cover bg-center filter brightness-[0.5] z-0"></div>

      {/* Teks berada di atas gambar */}
      <div className="relative z-10 mx-auto max-w-screen-xl lg:flex lg:h-screen lg:items-center py-4 px-4">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h1 className="text-3xl font-extrabold sm:text-6xl font-monsterrat">
            Tentang Kami
          </h1>

          <p className="mt-4 sm:text-lg/relaxed font-poppins font-medium text-sm">
            AgroVerse adalah platform digital yang bertujuan untuk mengedukasi
            dan memberi akses pasar tanaman hias di Indonesia. AgroVerse ingin
            menciptakan ekosistem yang mendukung para pencinta tanaman dan
            petani lokal, di mana siapa pun dapat belajar, tumbuh, dan menemukan
            solusi tanaman hias terbaik. Melalui fitur-fitur interaktif seperti
            panduan perawatan tanaman hias, forum diskusi komunitas pecinta
            tanaman hias, konsultasi ahli, serta marketplace yang menghubungkan
            pembudidaya lokal dengan pasar nasional, AgroVerse berkomitmen untuk
            mendukung praktik pertanian yang ramah lingkungan dan pemberdayaan
            ekonomi lokal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
