import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const BASEURL = "https://zenkaianime-ecommerce.onrender.com/";
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Handle form submission logic here
            const formData = {
                email,
                first_name: firstName,
                last_name: lastName,
                password,
                username,
            };
            const result = await axios.post(
                `${BASEURL}api/auth/register`,
                formData
            );
            console.log("User registered", result);
            navigate("/streaming");
        } catch (error) {
            console.error("Error signing up", error);
            setError("Error during sign-up. Please try again.");
        }
    };

    return (
        <>
            <div className="w-full h-screen">
                <img
                    className="sm:block absolute w-full h-full object-cover"
                    src={
                        "https://i.pinimg.com/originals/cc/e7/a5/cce7a5640b94bfdb6ab53ea610eb657d.jpg"
                    }
                    alt="popular anime show"
                />
                <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
                <div className="fixed w-full px-4 py-16 z-50">
                    <div className="max-w-[450px] h-[710px] mx-auto bg-black/75 text-white rounded-md">
                        <div className="max-w-[320px] mx-auto py-16">
                            <h1 className="text-3xl font-bold font-sans">
                                Sign Up
                            </h1>
                            <form
                                className="w-full flex flex-col py-4 font-sans"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    className="p-3 my-2 bg-gray-700 rounded"
                                    type="firstname"
                                    name="firstname"
                                    id="firstname"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    required
                                />
                                <input
                                    className="p-3 my-2 bg-gray-700 rounded"
                                    type="lastname"
                                    name="lastname"
                                    id="lastname"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    required
                                />
                                <input
                                    className="p-3 my-2 bg-gray-700 rounded"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    className="p-3 my-2 bg-gray-700 rounded"
                                    type="username"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                                <input
                                    className="p-3 my-2 bg-gray-700 rounded"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                                <button
                                    className="bg-blue-700 py-3 my-6 rounded font-bold"
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                                <div className="flex justify-between items-center text-sm text-gray-600 font-sans">
                                    <p>
                                        <input
                                            className="mr-2"
                                            type="checkbox"
                                        />
                                        Remember me
                                    </p>
                                    <p>Need Help?</p>
                                </div>
                                <p className="py-8 font-sans">
                                    <span className="text-gray-600">
                                        Already subscribed to ZenKaiAnime?
                                    </span>
                                    <Link to="/login"> Sign In</Link>
                                </p>
                            </form>
                            {error && (
                                <p className="text-red-500 text-sm font-sans">
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
