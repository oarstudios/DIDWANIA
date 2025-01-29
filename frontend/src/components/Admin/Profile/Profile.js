import React, { useEffect } from 'react'
import OrderLeft from '../../Order/OrderLeft'

function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0); // This scrolls the window to the top
}, []);
  return (
    <OrderLeft/>

  )
}

export default Profile