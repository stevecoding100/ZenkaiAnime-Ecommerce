import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { SlPhone } from "react-icons/sl";
import { CiCreditCard1 } from "react-icons/ci";
const CustomerOrderDetails = ({ order }) => {
  return (
    <div className="shadow-md rounded-md border-slate-300 border-2 p-4 grow bg-white ">
      <h2 className="text-center text-l">Customer Details</h2>
      <span className="mx-auto block w-full h-[2px] my-2 bg-slate-400/30" />
      <div className="flex justify-between p-4">
        <div className="flex flex-col space-y-4 text-slate-300">
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
    </div>
  );
};

export default CustomerOrderDetails;
