import React from "react";

const Cards = () => {
  return (
    <div className="sm:-mt-96 -mt-56 flex flex-col gap-6 items-center px-8 pb-16">
      {/* Card Webinar */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-[1100px] max-w-full border border-[#23502399]">
        <div className="flex flex-col lg:flex-row p-8 items-center bg-white rounded-lg">
          {/* Gambar */}
          <img
            src="../../public/Images/Komunitas/card1.png"
            alt="Webinar"
            className="lg:w-2/5 w-full h-80 object-cover rounded-xl"
          />
          {/* Konten */}
          <div className="p-6 sm:-mt-16">
            <div>
              <h3 className="text-2xl font-bold mb-4 font font-montserrat">
                WEBINAR
              </h3>
              <p className="text-[#303030] text-sm leading-relaxed font-montserrat">
                Ikuti webinar interaktif bersama para ahli tanaman hias untuk
                memperluas pengetahuan Anda tentang perawatan tanaman, tren
                terbaru, dan peluang bisnis. Dapatkan wawasan berharga dan tanya
                jawab langsung dengan narasumber berpengalaman.
              </p>
            </div>
          </div>
        </div>
        <a href="/komunitas/webinar">
          <button className="mt-6 w-full bg-[#269D26] text-white font-bold py-2 px-4 hover:bg-green-600">
            DAFTAR SEKARANG
          </button>
        </a>
      </div>

      {/* Card Forum Diskusi */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-[1100px] max-w-full border border-[#23502399]">
        <div className="flex flex-col lg:flex-row p-8 items-center bg-white rounded-lg">
          {/* Gambar */}
          <img
            src="../../public/Images/Komunitas/card2.png"
            alt="Webinar"
            className="lg:w-2/5 w-full h-80 object-cover rounded-xl"
          />
          {/* Konten */}
          <div className="p-6 sm:-mt-16">
            <div>
              <h3 className="text-2xl font-bold mb-4 font font-montserrat">
                FORUM DISKUSI
              </h3>
              <p className="text-[#303030] text-sm leading-relaxed font-montserrat">
                Bergabunglah dengan komunitas penggemar dan pakar tanaman hias
                dalam forum diskusi kami. Diskusikan berbagai topik menarik
                mulai dari teknik perawatan hingga rekomendasi tanaman terbaik.
                Anda juga dapat mengajukan pertanyaan dan berbagi pengalaman
                bersama pengguna lain.
              </p>
            </div>
          </div>
        </div>
        <a href="/komunitas/forum">
          <button className="mt-6 w-full bg-[#269D26] text-white font-bold py-2 px-4 hover:bg-green-600">
            FORUM DISKUSI
          </button>
        </a>
      </div>
    </div>
  );
};

export default Cards;
