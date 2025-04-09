import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/Client/UserDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetails from "./pages/Admin/ProductDetails";
import ProductAll from "./pages/Admin/ProductAll";
import ProductEdit from "./pages/Admin/ProductEdit";
import ProductAdd from "./pages/Admin/ProductAdd";
import BarcodeScanner from "./pages/Admin/BarcodeScanner";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/barcode" element={<BarcodeScanner />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/edit/:id" element={<ProductEdit />} />
        <Route path="/products" element={<ProductAll />} />
        <Route path="/add" element={<ProductAdd />} />
      </Routes>
    </Router>
  );
};

export default App;
