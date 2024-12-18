import React from "react";
import Navbar from "../../../components/AdminComponent/Navbar";
import Sidebar from "../../../components/AdminComponent/Sidebar";
import AddUserForm from "../../../components/AdminComponent/User/AddUser";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <AddUserForm />
      </div>
    </div>
  );
}

export default App;
