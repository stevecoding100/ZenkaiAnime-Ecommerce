import { Routes, Route } from "react-router-dom";
import StreamingHomePage from "./pages/StreamingHomePage";
import MerchandiseHomePage from "./pages/MerchandiseHomePage";

const App = () => {
    return (
        <Routes>
            <Route path="/streaming" element={<StreamingHomePage />} />
            <Route path="/shop" element={<MerchandiseHomePage />} />
        </Routes>
    );
};

export default App;
