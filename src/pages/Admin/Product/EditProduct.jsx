import React from "react";
import Navbar from "../../../components/AdminComponent/Navbar";
import Sidebar from "../../../components/AdminComponent/Sidebar";
import EditProduct from "../../../components/AdminComponent/Products/EditProduct";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <EditProduct />
      </div>
    </div>
  );
}

export default App;
