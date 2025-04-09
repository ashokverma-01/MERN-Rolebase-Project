import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { QRCodeCanvas } from "qrcode.react";

const ProductAll = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product/get");
      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(`http://localhost:5000/api/product/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/product/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAdd = () => {
    navigate("/add");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>All Products</h2>
          <button className="btn btn-success" onClick={handleAdd}>
            + Add Product
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price (₹)</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Barcode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <QRCodeCanvas value={product.barcode} size={128} />
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => handleView(product._id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductAll;
