import { Routes, Route } from "react-router-dom";
import StreamingHomePage from "./pages/streaming/StreamingHomePage";
import MerchandiseHomePage from "./pages/shop/MerchandiseHomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import AnimeDetailsPage from "./pages/streaming/AnimeDetailsPage";
import LoginPage from "./pages/auth/LoginPage";
import Test from "./pages/streaming/test";
import AdminPage from "./pages/admin/AdminPage";
import Layout from "./components/admin/Layout";
import Products from "./components/admin/Products";
import Orders from "./components/admin/Orders";
import ProductPage from "./pages/admin/ProductPage";
const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<StreamingHomePage />} />
                <Route path="/shop" element={<MerchandiseHomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/series/:animeId" element={<AnimeDetailsPage />} />
                {/* <Route path="/admin" element={<AdminPage />} /> */}
                <Route path="/dashboard" element={<Layout />}>
                    <Route index element={<AdminPage />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                </Route>

                <Route path="/cart" element={<Test />} />
            </Routes>
        </>
    );
};

export default App;
