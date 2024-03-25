import { Link } from "react-router-dom";

const SignInSingnUpBtn = ({ pageType }) => {
    return (
        <div>
            {" "}
            <ul className="flex items-center space-x-4 md:hidden">
                <Link to="/login">
                    <button
                        className={`px-4 py-2  hover:text-blue-300 ${
                            pageType === "streaming"
                                ? "text-gray-300"
                                : "text-white"
                        } rounded-md transition duration-300`}
                    >
                        Sign in
                    </button>
                </Link>
                <Link to="/signup">
                    <button
                        className={`px-4 py-2  bg-blue-700 hover:bg-blue-600 ${
                            pageType === "streaming"
                                ? "text-white"
                                : "text-slate-100"
                        } rounded-md transition duration-300`}
                    >
                        Sign up
                    </button>
                </Link>
            </ul>
        </div>
    );
};

export default SignInSingnUpBtn;
