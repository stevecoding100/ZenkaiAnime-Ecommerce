import { Routes, Route } from "react-router-dom";
import StreamingHomePage from "./pages/streaming/StreamingHomePage";
import MerchandiseHomePage from "./pages/shop/MerchandiseHomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import AnimeDetailsPage from "./pages/streaming/AnimeDetailsPage";
import LoginPage from "./pages/auth/LoginPage";
import Test from "./pages/streaming/test";
import AdminPage from "./pages/admin/AdminPage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StreamingHomePage />} />
        <Route path="/shop" element={<MerchandiseHomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/series/:animeId" element={<AnimeDetailsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<Test />} />
      </Routes>
    </>
  );
};

export default App;
