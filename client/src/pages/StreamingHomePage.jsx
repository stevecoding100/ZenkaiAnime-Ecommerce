import CarouselSlider from "../components/CarouselSlider";
import Navbar from "../components/Navbar";

const StreamingHomePage = () => {
    return (
        <div className="bg-[#000000] h-[100vh] w-full">
            <Navbar pageType="streaming" />
            <CarouselSlider />
        </div>
    );
};

export default StreamingHomePage;
