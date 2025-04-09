import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: "",
  });
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/product/${id}`);
      const data = await res.json();
      if (data.success) {
        setProduct(data.product);
        setPreviewImage(data.product.imageUrl);
      } else {
        alert("Product not found");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching product");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewImage(files[0]);
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/product/update/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) {
        alert("Product updated successfully");
        navigate("/admin");
      } else {
        alert("Failed to update product");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Price (₹)</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          {previewImage && (
            <div className="mb-3">
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}

          <button type="submit" className="btn btn-success">
            Update Product
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
