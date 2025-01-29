import React from "react";
import { Outlet } from "react-router-dom";

function OrderRgt() {
  return (
    <>
      <div className="orderRgt">
        <Outlet />
      </div>
    </>
  );
}

export default OrderRgt;
