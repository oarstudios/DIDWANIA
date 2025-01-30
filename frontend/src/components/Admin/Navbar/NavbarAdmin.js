import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import search from "../../Images/iconamoon_search-light.png";
import userProfImg from "../../Images/Group 46.png";
import logoImg from "../../Images/logo.png";
import "./NavbarAdmin.css";
import { useLogout } from '../../../hooks/useLogout';
import { useAuthContext } from "../../../hooks/useAuthContext";

function NavbarAdmin() {
  const [scrollY, setScrollY] = useState(0);
  const {logout} = useLogout()
  const navigate = useNavigate()
  const {user} = useAuthContext()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const handlelogout = () => {
    logout()
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const [products, setProducts] = useState('')

  useEffect(() => {
    const fetchProducts = async ()=>{
    const response = await fetch("http://localhost:5000/products/getallproducts")
        const json = await response.json()

        if(response.ok){
            setProducts(json.products)
            console.log(json)
        }
    }
    // if(user)
    // {

      fetchProducts()  
    // }
}, [])
// // console.log(searchQuery)
const [searchQuery, setSearchQuery] = useState('');
const [seStyle, setSeStyle] = useState({
  height:'0',
  padding: "0px"
})

const filteredItems = Array.isArray(products) ? products.filter((item) =>
searchQuery === '' || !item.title ? false : item.title?.toLowerCase().includes(searchQuery.toLowerCase())
) : [];

console.log("filteredItems", filteredItems )


const handleSearch = (e) => {
  setSearchQuery(e.target.value);
  setSeStyle({
    height: "max-content",
    padding: "0px"
  })
};
  return (
    <div className="navMain1">
    <Link to={"/"}>
      <img src={logoImg} className="logo1" alt="Logo" />
    </Link>
    <div className="navComps1">
      <div className="navLinks1">
        <Link to={"/"}>PRODUCTS</Link>
        <Link to={"/adminOrders"}>ORDERS</Link>
      </div>
      <div className="navIcons1">
        <div className="smallSearchBar1">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery || ""}
            onChange={(e) => handleSearch(e)}
          />
          <img src={search} alt="Search Icon" />
          <ul className="searchedEle" style={seStyle}>
            {filteredItems.map((item) => (
              <Link key={`/product/${item._id}`} to={`/product/${item._id}`}>
                <li>{item?.title}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="olLogout">
          <h3 onClick={handlelogout}>Log out</h3>
        </div>
      </div>
    </div>
  </div>
  
  
  );
}

export default NavbarAdmin;
