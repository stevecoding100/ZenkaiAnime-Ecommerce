import { Image } from "@nextui-org/react";
import fedex from "../../assets/fedex.svg";
import barcode from "../../assets/barcode.svg";
const ShippingDetails = () => {
  return (
    <div className="mt-4 lg:mt-0 lg:w-1/6 shadow-md rounded-md border-slate-300 border-2 p-4 mx-4 bg-white ">
      <h2 className="text-center">Shipping Details</h2>

      <span className="mx-auto block w-full h-[2px] my-2 bg-slate-400/30" />
      <div className="flex items-center flex-col justify-center mt-2">
        <div className="flex items-center">
          <Image src={fedex} width={100} height={100} alt="Fedex" />
          <span className=""> FedEx Home Delivery&#174;</span>
        </div>

        <Image src={barcode} width={200} height={200} alt="Barcode" />
        <span className="text-xs text-slate-600">Scan barcode to track.</span>
      </div>
    </div>
  );
};

export default ShippingDetails;
