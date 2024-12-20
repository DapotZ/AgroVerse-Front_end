import React from "react";
import Navbar from "../../components/UserComponent/Navbar/Navbar";
import WebinarBanner from "../../components/UserComponent/Komunitas/WebinarBanner";
import WebinarForm from "../../components/UserComponent/Komunitas/WebinarForm";
import Footer from "../../components/UserComponent/Footer/FooterUser";
const FormWebinar = () => {
  return (
    <div>
      <Navbar />
      <WebinarBanner
        image="Images/komunitas/background_webinar.png"
        text1="Webinar Interaktif"
        text2="Bersama Para Ahli"
      />
      <WebinarForm />
      <Footer />
    </div>
  );
};

export default FormWebinar;
