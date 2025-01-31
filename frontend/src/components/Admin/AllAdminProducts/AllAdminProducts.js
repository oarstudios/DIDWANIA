import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AllAdminProducts.css';
import NavbarAdmin from '../Navbar/NavbarAdmin';
import Footer from '../../Home/Footer/Footer';
import { MdDeleteForever } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { useAuthContext } from '../../../hooks/useAuthContext';


function AllAdminProducts() {
  // Initializing the product list
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await fetch('https://backend.didwaniacreations.in/products/getallproducts');
    const json = await response.json();
    if (response.ok) {
      setProducts(json.products);
      console.log("products", json.products);
    }
  };
  useEffect(() => {
    

    if (user) {
      fetchData();
    }

  }, [user]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Calculate the indexes for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Create page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDeleteProduct = async(productId)=>{

    const response = await fetch(`https://backend.didwaniacreations.in/products/deleteproduct/${productId}`,{
      method: "DELETE"
    })
    const json = await response.json()

    if(response.ok){
      console.log('Deleted successfully', json)
      fetchData();
    }
  } 

  return (
    <>
      <NavbarAdmin />

      <div className="sub-title">
        <div className="header">
          <h2 className="trendingNow-text">All Products</h2>

          <Link to="/addProduct" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <h3>Add New +</h3>
          </Link>
        </div>

        <div className="product-section">
          {currentProducts.map((product) => (
            <Link to={`/product/${product._id}`} className="product-item" key={product._id}>
              {product.productImages && product.productImages.length > 0 ? (
                <img
                  src={`https://backend.didwaniacreations.in/uploads/${product.productImages[0]}`}
                  alt={`https://backend.didwaniacreations.in/uploads/${product.productImages[0]}`}
                  className="hoverable"
                />
              ) : (
                <p>No image available</p>
              )}

              <div className="product-details">
                <p className="model-type">{product.title}</p>
                <div className="price-container">
                  <p className="price">&#8377;{product.price}</p>
                  {/* <Link to={`/deleteProduct`}> */}
                    {/* <MdDeleteForever className="fa-cart-plus" onClick={()=>handleDeleteProduct(product._id)}/> */}
                  {/* </Link> */}
                </div>
              </div>
              <Link to={`/editProduct/${product._id}`} className="edit-button">
                <MdEdit className="edit-icon" />
              </Link>
            </Link>
          ))}
        </div>

        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default AllAdminProducts;
