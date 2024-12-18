import React from "react";
import Navbar from "../../../components/AdminComponent/Navbar";
import Sidebar from "../../../components/AdminComponent/Sidebar";
import AddWebinarForm from "../../../components/AdminComponent/Webinar/AddWebinar";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <AddWebinarForm />
      </div>
    </div>
  );
}

export default App;
