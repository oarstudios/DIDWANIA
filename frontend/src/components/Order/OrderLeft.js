import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

function OrderLeft() {
    const [olh, setOlh] = useState("oh");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate()
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const [name, setName] = useState('')
    
    useEffect(()=>{
        const fetchData = async()=>{
          const response = await fetch(`http://localhost:5000/users/getuserbyid/${user.user?._id}`)
          const json = await response.json()
          if(response.ok)
          {
            console.log("User Details", json)
            setName(json.username)
          }
        }
        if(user)
            {
                fetchData()
            }
        },[user])
        
        const handlelogout = () => {
        logout()
        setTimeout(() => {
          navigate('/');
        }, 1000);
      };

    const handleClick = (e) => {
        setOlh(e);
        console.log(`Clicked: ${e}`);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        console.log(`Sidebar open: ${!isSidebarOpen}`);
    };

    return (
        <>
            <div className={`orderLeft ${isSidebarOpen ? 'open' : ''}`}>
                <div className="olHeading">
                    {/* <Link to="/admin"> */}
                    <h1>Hello</h1>
                    {/* </Link> */}
                    <h2>{name}</h2>
                    <button className="hamburger" onClick={toggleSidebar}>
                        ☰
                    </button>
                </div>
                <div className="olContent">
                    <h3 onClick={() => handleClick("oh")} className={olh === "oh" ? "olContentH3" : ""}>
                        <Link to={'/order'}>Order History</Link>
                    </h3>
                    <h3 onClick={() => handleClick("acd")} className={olh === "acd" ? "olContentH3" : ""}>
                        <Link to={`/order/acdetails/${user?.user?._id}`}>Account Details</Link>
                    </h3>
                </div>
                <div className="olLogout">
                    {/* <Link to={'/signin'} style={{ textDecoration: 'none', cursor: 'pointer' }}> */}
                        <h3 onClick={handlelogout}>Log out</h3>
                    {/* </Link>  */}
                </div>
            </div>
        </>
    );
}

export default OrderLeft;
