import { Routes, Route } from "react-router-dom";
import StreamingHomePage from "./pages/StreamingHomePage";
import MerchandiseHomePage from "./pages/MerchandiseHomePage";
import SignUpPage from "./pages/SignUpPage";
import AnimeDetailsPage from "./pages/AnimeDetailsPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StreamingHomePage />} />
      <Route path="/shop" element={<MerchandiseHomePage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/series/:id" element={<AnimeDetailsPage />} />
    </Routes>
  );
};

export default App;
