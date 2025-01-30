import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { IoMdArrowRoundBack } from "react-icons/io";
import NavbarAdmin from '../Navbar/NavbarAdmin';
import Footer from '../../Home/Footer/Footer';
import './CustOrders.css';

// const ordersData = {
//   Pending: [
//     { id: 123, name: 'Akshat Agrawal', address: 'Mumbai, 400001', date: '12/08/2024', price: '2000', status: 'Pending' },
//     { id: 124, name: 'Rahul Singh', address: 'Pune, 411007', date: '15/08/2024', price: '1500', status: 'Pending' }
//   ],
//   Dispatched: [
//     { id: 125, name: 'Anjali Rao', address: 'Bangalore, 560003', date: '11/08/2024', price: '2500', status: 'Dispatched' },
//     { id: 126, name: 'Suresh Kumar', address: 'Chennai, 600042', date: '09/08/2024', price: '1800', status: 'Dispatched' }
//   ],
//   Shipped: [
//     { id: 127, name: 'Manisha Koirala', address: 'Kolkata, 700019', date: '10/08/2024', price: '2100', status: 'Shipped' },
//     { id: 128, name: 'Deepak Raj', address: 'Delhi, 110001', date: '13/08/2024', price: '1600', status: 'Shipped' }
//   ]
// };

function CustOrders() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  const { user } = useAuthContext();
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) {
        console.log('User token is not available');
        return;
      }

      try {
        const response = await fetch('https://147.93.103.125:5000/bills/getbills', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log('Failed to fetch orders:', errorData);
          return;
        }

        const json = await response.json();
        console.log('Fetched orders data:', json);

        const filteredOrders = user.user?.userType === 'User'
          ? json.filter(order => order.userId === user.user?._id)
          : json;

        setOrdersData(filteredOrders);
        console.log('User Order Data:', filteredOrders);
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };

    fetchData();
  }, [user]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  return (
    <>
      <NavbarAdmin />
      <div className="cust-orders-container">
        <div className="cust-orders-header">
          <Link to="/"style={{ textDecoration: 'none', cursor: 'pointer' }} className="cust-orders-icon"><IoMdArrowRoundBack /></Link>
          <span className="cust-orders-title">Customer Orders</span>
        </div>
        {/* {Object.entries(ordersData).map(([status, orders]) => ( */}
          <div className={`cust-orders-section cust-orders`} >
            <div className="cust-orders-section-title">Orders</div>
            <table className="cust-orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th className="hidden-mobile">NAME</th>
                  <th className="hidden-mobile">ADDRESS</th>
                  <th>DATE</th>
                  <th className="hidden-mobile">PRICE</th>
                  <th>STATUS</th>
                  <th>VIEW ORDER</th>
                </tr>
              </thead>
              <tbody>
                {ordersData?.map((order,index) => (
                  <tr key={order._id}>
                    <td>{index+1}</td>
                    <td className="hidden-mobile">{order.firstName}</td>
                    <td className="hidden-mobile">{order.address}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td className="hidden-mobile">₹{order.totalPrice}</td>
                    <td className={`cust-orders-status cust-orders-status-${order.status.toLowerCase()}`}>{order.status}</td>
                 <td className='cust-orders-view-order'><Link to={`/viewCustOrder/${order._id}`}  style={{ textDecoration: 'none', cursor: 'pointer', color: "#9A318A" }} >DETAILS</Link> </td> 
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default CustOrders;
