import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
const OrderDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/orders/${id}`);
  }, [id]);

  return <div>OrderPage {id}</div>;
};

export default OrderDetails;
