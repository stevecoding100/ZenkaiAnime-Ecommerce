import { spiral } from "ldrs";
const Spinner = () => {
  spiral.register();
  return <l-spiral size="50" speed="0.9" color="white"></l-spiral>;
};
export default Spinner;
