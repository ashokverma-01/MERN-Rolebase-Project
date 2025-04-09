import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/product/${id}`);
      const data = await res.json();

      if (data.success) {
        setProduct(data.product);
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h2 className="mb-4">Product Details</h2>
        <div className="card" style={{ maxWidth: "800px", margin: "auto" }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="card-img-top"
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
          <div className="card-body">
            <h4 className="card-title">
              <strong>Name: </strong>
              {product.name}
            </h4>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
            <p>
              <strong>Barcode:</strong> {product.barcode}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(product.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
