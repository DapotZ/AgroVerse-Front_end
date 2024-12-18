import React from "react";
import Navbar from "../../../components/AdminComponent/Navbar";
import Sidebar from "../../../components/AdminComponent/Sidebar";
import EditUser from "../../../components/AdminComponent/User/EditUser";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <EditUser />
      </div>
    </div>
  );
}

export default App;
