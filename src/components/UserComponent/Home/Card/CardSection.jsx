import React from "react";

const CardSection = ({ image, title }) => {
  return (
    <article className="flex flex-col gap-4 rounded-lg border-2 border-solid border-[#1E7431] bg-white p-6 shadow-2xl">
      {/* Gambar di sisi kiri dengan ukuran kecil */}
      <img alt="" src={image} className="w-16 h-16 object-cover rounded-md" />

      {/* Konten di sisi kanan */}
      <div className="mt-20">
        <a href="#">
          <h3 className="text-lg font-semibold text-[#303030] font-poppins">
            {title}
          </h3>
        </a>
      </div>
    </article>
  );
};

export default CardSection;
