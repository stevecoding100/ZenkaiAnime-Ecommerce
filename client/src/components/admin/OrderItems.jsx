import { Image } from "@nextui-org/react";

const OrderItemsContainer = ({ order }) => {
  return (
    <>
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
    </>
  );
};

export default OrderItemsContainer;
