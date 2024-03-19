import React from "react";

const SignInSingnUpBtn = ({ pageType }) => {
    return (
        <div>
            {" "}
            <ul className="flex items-center space-x-4 md:hidden">
                <button
                    className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 ${
                        pageType === "streaming"
                            ? "text-white"
                            : "text-slate-900"
                    } text-white rounded-md transition duration-300`}
                >
                    Sign in
                </button>
                <button
                    className={`px-4 py-2 border-2 border-blue-500 hover:bg-blue-600 ${
                        pageType === "streaming"
                            ? "text-white"
                            : "text-slate-900"
                    } rounded-md transition duration-300`}
                >
                    Sign up
                </button>
            </ul>
        </div>
    );
};

export default SignInSingnUpBtn;
