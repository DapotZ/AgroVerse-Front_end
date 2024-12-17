import React from "react";

const Banner = ({ image }) => {
  return (
    <section className="relative h-screen z-0">
      {/* Background image hanya setengah layar */}
      <div
        className="absolute top-0 left-0 w-full h-2/4 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Teks berada di tengah gambar dan sesuai keinginan */}
      <div className="relative z-10 flex items-center justify-center sm:justify-start h-2/4 px-8">
        <div className="text-center sm:text-left text-[#303030]">
          <h1 className="text-3xl font-extrabold sm:text-5xl leading-normal font-poppins ">
            Bergabung dan <br />
            Diskusikan Tanaman <br />
            Hias Bersama <br />
            Komunitas Ahli
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Banner;
