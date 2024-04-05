import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ecomAPI from "../../../api/ecomAPI";
const OrderDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await ecomAPI.orders.getOrderById(id);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching order", error);
      }
    };
    fetchOrder();
  }, [id]);

  return <div>OrderPage {id}</div>;
};

export default OrderDetails;
