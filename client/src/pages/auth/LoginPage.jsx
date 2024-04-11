import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ecomAPI from "../../../utils/ecomAPI";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const BASEURL = "https://zenkaianime-ecommerce.onrender.com/";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await ecomAPI.auth.login({ username, password });

    if (result.status === 200) {
      navigate("/");
    } else {
      setError("Invalid username or password");
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
          <div className="max-w-[450px] h-[650px] mx-auto bg-black/75 text-white rounded-md">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold font-sans">Sign In</h1>
              <form
                className="w-full flex flex-col py-4 font-sans"
                onSubmit={handleSubmit}
              >
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="username"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && (
                  <p className="text-red-500 font-sans text-sm">{error}</p>
                )}
                <button
                  className="bg-blue-700 py-3 my-6 rounded font-bold"
                  type="submit"
                >
                  Sign In
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600 font-sans">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8 font-sans">
                  <span className="text-gray-600">New to ZenKaiAnime?</span>
                  <Link to="/signup"> Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
