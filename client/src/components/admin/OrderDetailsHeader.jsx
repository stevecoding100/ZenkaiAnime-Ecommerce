import { IoPrint } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

const OrderDetailsHeader = ({ order, formatDate }) => {
  return (
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
  );
};

export default OrderDetailsHeader;
