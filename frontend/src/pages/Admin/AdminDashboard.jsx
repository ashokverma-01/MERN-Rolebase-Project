import React from "react";
import Navbar from "../../components/Navbar";
import Barcode from "../Admin/BarcodeScanner";

const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <Barcode />
    </div>
  );
};

export default AdminDashboard;
