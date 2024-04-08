import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ecomAPI from "../../../utils/ecomAPI";
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ecomAPI.orders.getOrder();
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchOrders();
  }, []);

  const tableRows = orders.map((order, index) => {
    const date = new Date(order.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return (
      <tr
        key={order.id}
        className={`${
          index % 2 === 0
            ? "bg-white dark:bg-gray-900"
            : "bg-gray-50 dark:bg-gray-800"
        } border-b dark:border-gray-700`}
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {order.id}
        </th>
        <td className="px-6 py-4">{formattedDate}</td>
        <td className="px-6 py-4">${order.total_price.toFixed(2)}</td>
        <td className="px-6 py-4">{order.status}</td>
        <td className="px-6 py-4">
          <Link
            to={`${order.id}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order Number
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
