import React from "react";
import Navbar from "../../components/UserComponent/Navbar/Navbar";
import Banner from "../../components/UserComponent/Komunitas/Banner";
import Cards from "../../components/UserComponent/Komunitas/Card";
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
