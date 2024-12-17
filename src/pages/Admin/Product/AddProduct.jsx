import React from "react";
import AddProductForm from "../../../components/AdminComponent/Products/AddProduct";
import Navbar from "../../../components/AdminComponent/Navbar";
import Sidebar from "../../../components/AdminComponent/SideBar";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <AddProductForm />
      </div>
    </div>
  );
}

export default App;
