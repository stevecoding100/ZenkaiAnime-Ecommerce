import { Routes, Route } from "react-router-dom";
import StreamingHomePage from "./pages/StreamingHomePage";
import MerchandiseHomePage from "./pages/MerchandiseHomePage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StreamingHomePage />} />
      <Route path="/shop" element={<MerchandiseHomePage />} />
      <Route path="/register" element={<SignUpPage />} />
    </Routes>
  );
};

export default App;
