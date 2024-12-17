import React from "react";
import Navbar from "../../components/UserComponent/Navbar/Navbar";
import ProductById from "../../components/UserComponent/Belanja/ProductById";
import Footer from "../../components/UserComponent/Footer/FooterUser";

const Belanja = () => {
  return (
    <div>
      <Navbar />
      <ProductById />
      <Footer />
    </div>
  );
};

export default Belanja;
