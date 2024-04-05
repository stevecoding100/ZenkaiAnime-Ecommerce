import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ecomAPI from "../../../api/ecomAPI";
import { Image } from "@nextui-org/react";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { SlPhone } from "react-icons/sl";
import { CiCreditCard1 } from "react-icons/ci";
import { IoPrint } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import fedex from "../../assets/fedex.svg";
import barcode from "../../assets/barcode.svg";

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
        <div className=" bg-white w-full px-2 py-4 flex items-center justify-between">
          <div>
            <h2 className="border-slate-400/50">
              Order# <span className="text-blue-600 text-sm">{order.id}</span>
            </h2>
            <p className="text-slate-400 text-xs">{formatDate(order.date)}</p>
          </div>
          <div className="">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              <MdModeEdit className="inline-block mr-2 text-2xl" /> Edit
            </button>
            <button className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-4">
              <IoPrint className="inline-block mr-2 text-2xl" /> Print Order
            </button>
          </div>
        </div>
        {/* Order Details */}
        <div className="flex flex-col overflow-x-auto shadow-md rounded-md border-slate-300 border-2 py-4 m-4 bg-white">
          <h2 className="text-center text-3xl">Order Details</h2>
          {order.orderItems.map((item) => (
            <div
              className="flex flex-col sm:flex-row items-center justify-around p-2"
              key={item.id}
            >
              <Image
                width={125}
                height={125}
                src={item.image_url}
                alt="Order Image"
              />
              <div className="mt-2 sm:mt-0">
                <p className="text-lg">{item.name}</p>
                <p className="text-slate-400 text-sm">ID: {item.id}</p>
              </div>
              <p className="space-x-1 mt-2 sm:mt-0">
                <span>${item.price}</span> x <span>{item.quantity}</span>
              </p>
              <p className="mt-2 sm:mt-0">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <span className="mx-auto block w-5/6 h-[2px] my-2 bg-slate-400/30"></span>
          <div className="flex flex-col lg:flex-row justify-between mx-4">
            <div className="my-2 text-center">
              <h2 className="text-2xl">Order Note</h2>
              <p className="line-clamp-3 mt-2 lg:mt-0 lg:ml-10 text-slate-600">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="mt-4 lg:mt-0 lg:w-[24rem] lg:ml-5">
              <h2 className="text-center text-2xl my-2">Order Summary</h2>
              <div className="flex justify-between text-slate-600">
                <h2>Subtotal:</h2>
                <p>${order.total_price.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-slate-600">
                <h2>Shipping:</h2>
                <p>$3.50</p>
              </div>
              <div className="flex justify-between text-slate-600">
                <h2>Tax:</h2>
                <p>$1.23</p>
              </div>
              <span className="mx-auto block w-full h-[2px] my-2 bg-slate-400/30"></span>
              <div className="flex justify-between text-xl">
                <h2>Total</h2>
                <p>${(order.total_price + 3.5 + 1.23).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between m-4">
          {/* Customer details */}
          <div className="flex flex-col lg:flex-row justify-between shadow-md rounded-md border-slate-300 border-2 p-10 lg:w-1/2 bg-white ">
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-slate-700">
                <AiOutlineUser className="inline-block text-slate-600 mr-1" />
                {order.user.first_name} {order.user.last_name}
              </p>
              <p className="text-sm text-slate-700">
                <MdOutlineEmail className="inline-block text-slate-600 mr-1" />
                <span className="text-blue-500">{order.user.email}</span>
              </p>
              <p className="text-sm text-slate-700">
                <SlPhone className="inline-block text-slate-600 mr-1" />
                <span className="mr-1">+1</span>
                555-555-5555
              </p>
              <p className="text-sm text-slate-700">
                <CiCreditCard1 className="inline-block text-slate-600 mr-1" />
                Credit Card
              </p>
            </div>
            <div className="mt-4 lg:mt-0 lg:ml-4 space-y-4">
              <p className="text-slate-700 text-sm">United States</p>
              <p className="text-slate-700 text-sm">New York City</p>
              <p className="text-slate-700 text-sm">
                1234 Post Street, Suite 100, New York City, NY
              </p>
              <p className="text-slate-700 text-sm">94762</p>
            </div>
          </div>
          {/* Order History */}
          <div className="mt-4 lg:mt-0 lg:w-1/4 shadow-md rounded-md border-slate-300 border-2 p-4 mx-4 bg-white ">
            <h2 className="text-center">Order History</h2>
            <span className="mx-auto block w-full h-[2px] my-2 bg-slate-400/30" />
            <div className="flex items-center justify-center mt-2">
              <div className="rounded-full border-2 border-blue-500 p-3 bg-blue-500/5">
                <FaShippingFast className="text-3xl text-blue-500" />
              </div>
              <div className="mx-2">
                <p className="text-slate-700 text-sm">Shipped ✅</p>
                <p className="text-slate-700 text-xs">Oct 15, 2021</p>
              </div>
            </div>
          </div>
          {/* Shipping Details */}
          <div className="mt-4 lg:mt-0 lg:w-1/6 shadow-md rounded-md border-slate-300 border-2 p-4 mx-4 bg-white ">
            <h2 className="text-center">Shipping Details</h2>

            <span className="mx-auto block w-full h-[2px] my-2 bg-slate-400/30" />
            <div className="flex items-center flex-col justify-center mt-2">
              <div className="flex items-center">
                <Image src={fedex} width={100} height={100} alt="Fedex" />
                <span className=""> FedEx Home Delivery&#174;</span>
              </div>

              <Image src={barcode} width={200} height={200} alt="Barcode" />
              <span className="text-xs text-slate-600">
                Scan barcode to track.
              </span>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default OrderDetails;
