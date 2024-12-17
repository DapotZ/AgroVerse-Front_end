import React from "react";
import CardSection from "./Card/CardSection";

const Card = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 mt-16 px-4">
        {/* Gunakan grid untuk membuat tata letak responsif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <CardSection
            image="../../../public/Images/card/card1.png"
            title="Panduan Perawatan berbagai jenis tanaman hias"
          />
          <CardSection
            image="../../../public/Images/card/card2.png"
            title="Forum Diskusi untuk berbagi ilmu dan pengalaman"
          />
          <CardSection
            image="../../../public/Images/card/card3.png"
            title="Sesi edukasi interaktif dengan pakar tanaman hias"
          />
          <CardSection
            image="../../../public/Images/card/card4.png"
            title="Marketplace alat dan bahan perawatan tanaman"
          />
        </div>
      </div>
    </>
  );
};

export default Card;
