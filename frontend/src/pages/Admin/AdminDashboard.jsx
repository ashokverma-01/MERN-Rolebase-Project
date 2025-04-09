import React from "react";
import Navbar from "../../components/Navbar";
import ProductList from "../Admin/ProductList";

const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <ProductList />
    </div>
  );
};

export default AdminDashboard;
