import React from "react";
import Navbar from "../../components/UserComponent/Navbar/Navbar";
import Banner from "../../components/UserComponent/Komunitas/banner";
import Cards from "../../components/UserComponent/Komunitas/card";
import Footer from "../../components/UserComponent/Footer/FooterUser";
const Komunitas = () => {
  return (
    <div>
      <Navbar />
      <Banner image="../../../public/Images/Komunitas/background.png" />
      <Cards />
      <Footer />
    </div>
  );
};

export default Komunitas;
