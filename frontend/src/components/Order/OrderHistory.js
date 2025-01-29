import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

function OrderHistory() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  const { user } = useAuthContext();
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching orders...');
        const response = await fetch('http://localhost:5000/bills/getbills', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        // console.log('Response Status:', response.status);
        // console.log('Response OK:', response.ok);
        const json = await response.json();
        // console.log('Fetched JSON:', json);
        // console.log('User Object ID:', user.user._id);
  
        if (response.ok) {
          let userHistory;
          if (user?.user?.userType === "User") {
            userHistory = await json.filter((order) => {
              // console.log("Order User ID:", order?.userId);
              // console.log("Current User ID:", user?.user?._id);
              return String(order?.userId) === String(user?.user?._id);
            });
            console.log("Filtered User History:", userHistory);
            setOrdersData(userHistory);
          } else {
            setOrdersData(json);
          }
          console.log("User Order Data:", userHistory);
        } else {
          console.log("Failed to fetch orders", json);
        }
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };
    if(user)
    {
      
      fetchData();
    }
  
  }, [user]);
  

  // Convert ISO date to a readable format
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
      <div className="cust-orders-container">
        <div className="cust-orders-section cust-orders">
          <h2>Orders</h2> {/* Heading for the orders section */}
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
              {ordersData?.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td className="hidden-mobile">{order.firstName}</td>
                  <td className="hidden-mobile">{order.address}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td className="hidden-mobile">₹{order.totalPrice}</td>
                  <td className={`cust-orders-status cust-orders-status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </td>
                  <td className='cust-orders-view-order'>
                    <Link to={`/orderDetails/${order._id}`} style={{ textDecoration: 'none', cursor: 'pointer', color: "#9A318A" }}>
                      DETAILS
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default OrderHistory;
