import React from "react";
import Navbar from "../../../components/AdminComponent/Navbar";
import Sidebar from "../../../components/AdminComponent/Sidebar";
import ContentWebinar from "../../../components/AdminComponent/Webinar/ContentWebinar";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <ContentWebinar />
      </div>
    </div>
  );
}

export default App;
