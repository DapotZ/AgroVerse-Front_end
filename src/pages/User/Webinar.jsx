import React from "react";
import Navbar from "../../components/UserComponent/Navbar/Navbar";
import WebinarBanner from "../../components/UserComponent/Komunitas/WebinarBanner";
import WebinarCollection from "../../components/UserComponent/Komunitas/WebinarCollection";
import Footer from "../../components/UserComponent/Footer/FooterUser";
const Komunitas = () => {
  return (
    <div>
      <Navbar />
      <WebinarBanner
        image="../../../public/Images/Komunitas/background_webinar.png"
        text1="Webinar Interaktif"
        text2="Bersama Para Ahli"
      />
      <WebinarCollection />
      <Footer />
    </div>
  );
};

export default Komunitas;
