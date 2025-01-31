import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddProduct.css'; // Updated styles
import NavbarAdmin from '../Navbar/NavbarAdmin';
import Footer from '../../Home/Footer/Footer';
import { IoMdArrowRoundBack } from "react-icons/io";
import useNotify from '../../../hooks/useNotify';
import { ToastContainer } from 'react-toastify';

function AddProduct() {
  const {notify} = useNotify()
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [stock, setStock] = useState(true);
  const [category, setCategory] = useState('Religious Accessories');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image1) {
      notify('Please upload at least one image.', 'error');
      return;
    }
  
    // Create a FormData object
    const formData = new FormData();
    formData.append('title', productName);
    formData.append('price', parseFloat(price));
    formData.append('description', description);
    formData.append('itemInStock', stock);
    formData.append('category', category);
  
    // Append images if they exist
    if (image1) {
      formData.append('productImages', image1);
    }
    if (image2) {
      formData.append('productImages', image2);
    }

    console.log(formData)
  
    // Send the FormData directly
    const response = await fetch(`https://147.93.103.125/products/addproduct`, {
      method: 'POST',
      body: formData,
    });
  
    if (response.ok) {
      const result = await response.json();
      console.log('Product added successfully:', result);
      notify('Product added successfully', 'success')
      navigate('/')

    } else {
      console.error('Failed to add the product:', response.statusText);
      notify('Failed to add the product', "error")
    }
  };

  

  return (
    <>
      <NavbarAdmin />
   
      <div className="admin-upload-form">
      <Link to="/" style={{ textDecoration: 'none', cursor: 'pointer', fontSize: "1.5rem" }}><IoMdArrowRoundBack /></Link>
        <h1>Upload New Product</h1>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Religious Accessories">Religious Accessories</option>
              <option value="Daily Accessories">Daily Accessories</option>
    
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image1">Product Image 1</label>
            <input
              type="file"
              id="image1"
              name="productImages"
              onChange={(e) => setImage1(e.target.files[0])}
              required
            />
          </div>

          <div className="form-group" style={{display: "none"}}>
            <label htmlFor="image2">Product Image 2 (Optional)</label>
            <input
              type="file"
              id="image2"
              name="productImages"
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock Status</label>
            <select
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value === 'true')}
            >
              <option value={true}>In Stock</option>
              <option value={false}>Out of Stock</option>
            </select>
          </div>

          <button type="submit">Upload Product</button>
        </form>
      </div>
      {/* <Footer /> */}
      <ToastContainer/>
    </>
  );
}

export default AddProduct;
