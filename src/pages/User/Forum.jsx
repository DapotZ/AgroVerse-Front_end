import React from "react";
import Navbar from "../../components/UserComponent/Navbar/Navbar";
import WebinarBanner from "../../components/UserComponent/Komunitas/WebinarBanner";
import PostForm from "../../components/UserComponent/Komunitas/PostinganForm";
import PostList from "../../components/UserComponent/Komunitas/PostinganList";
import Footer from "../../components/UserComponent/Footer/FooterUser";
const Forum = () => {
  return (
    <div>
      <Navbar />
      <WebinarBanner
        image="/Images/Forum/background.png"
        text1="Ngobrol Asyik tentang"
        text2="Tanaman Hias"
      />
      <PostForm />
      <PostList />
      <Footer />
    </div>
  );
};

export default Forum;
