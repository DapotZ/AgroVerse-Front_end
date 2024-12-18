import React from "react";
import Navbar from "../../../components/AdminComponent/Navbar";
import Sidebar from "../../../components/AdminComponent/Sidebar";
import EditWebinar from "../../../components/AdminComponent/Webinar/EditWebinar";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <EditWebinar />
      </div>
    </div>
  );
}

export default App;
