import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ecomAPI from "../../../utils/ecomAPI";
import OrderDetailsHeader from "./OrderDetailsHeader";
import OrderItemsContainer from "./OrderItems";
import CustomerOrderDetails from "./CustomerOrderDetails";
import OrderHistory from "./OrderHistory";
import ShippingDetails from "./ShippingDetails";
const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await ecomAPI.orders.getOrderById(id);
        console.log("FROM", response.data);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order", error);
      }
    };
    fetchOrder();
  }, [id]);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    order && (
      <section className=" bg-stone-200/70 h-screen">
        <OrderDetailsHeader order={order} formatDate={formatDate} />
        <OrderItemsContainer order={order} />
        <div className="flex flex-col lg:flex-row justify-between m-4 gap-10">
          <CustomerOrderDetails order={order} />
          <OrderHistory order={order} />
          <ShippingDetails order={order} />
        </div>
      </section>
    )
  );
};

export default OrderDetails;
