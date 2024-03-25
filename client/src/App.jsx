import { Routes, Route } from "react-router-dom";
import StreamingHomePage from "./pages/StreamingHomePage";
import MerchandiseHomePage from "./pages/MerchandiseHomePage";
import SignUpPage from "./pages/SignUpPage";
import AnimeDetailsPage from "./pages/AnimeDetailsPage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
const App = () => {
    return (
        <>
            <Routes>
                <Route path="/streaming" element={<StreamingHomePage />} />
                <Route path="/shop" element={<MerchandiseHomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/series/:id" element={<AnimeDetailsPage />} />
            </Routes>
        </>
    );
};

export default App;
