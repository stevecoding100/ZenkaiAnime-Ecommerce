import { FaShippingFast } from "react-icons/fa";
const OrderHistory = () => {
  return (
    <div className="mt-4 lg:mt-0 lg:w-1/6 shadow-md rounded-md border-slate-300 border-2 p-4 mx-4 bg-white ">
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
  );
};

export default OrderHistory;
