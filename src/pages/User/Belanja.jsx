import React from "react";
import Navbar from "../../components/UserComponent/Navbar/Navbar";
import Carousel from "../../components/UserComponent/Belanja/Carousel";
import Collection from "../../components/UserComponent/Belanja/Collection";
import Footer from "../../components/UserComponent/Footer/FooterUser";

const Belanja = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Collection />
      <Footer />
    </div>
  );
};

export default Belanja;
