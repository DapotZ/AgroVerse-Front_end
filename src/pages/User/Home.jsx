import React from "react";
import Navbar from "../../components/UserComponent/Navbar/Navbar";
import Banner from "../../components/UserComponent/Home/Banner";
import Collection from "../../components/UserComponent/Home/Collection";
import Card from "../../components/UserComponent/Home/Card";
import Footer from "../../components/UserComponent/Footer/FooterUser";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Card />
      <Collection />
      <Footer />
    </div>
  );
};

export default Home;
