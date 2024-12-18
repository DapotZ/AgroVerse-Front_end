import React from "react";
import Content from "../../components/AdminComponent/Dashboard/Content";
import Navbar from "../../components/AdminComponent/Navbar";
import Sidebar from "../../components/AdminComponent/Webinar/SideBar";

function App() {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <Content />
        </div>
      </div>
    </>
  );
}

export default App;
