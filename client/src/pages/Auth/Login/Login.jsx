import { CiUser } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo_icon from "../../../assets/logo_icon.png";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col w-full max-w-5xl overflow-hidden rounded-lg md:flex-row">
        {/* Left Side: Logo and Title */}
        <div className="flex flex-col items-center justify-center w-full p-8 text-white md:w-1/2">
          <div className="mb-2 transition-transform duration-300 transform hover:scale-110">
            <img src={logo_icon} alt="Logo" className="w-32 h-32" />
          </div>
          <h1 className="mb-2 text-4xl font-bold text-center text-white drop-shadow-lg">Chat App</h1>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg md:w-1/2 bg-opacity-90">
          <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">Login</h1>
          <form className="space-y-4">
            {/* Username Field */}
            <div className="relative">
              <input
                id="username"
                type="text"
                placeholder="Username"
                className="w-full py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                required
              />
              <CiUser className="absolute text-gray-500 top-3 left-3" />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                required
              />
              <FaLock className="absolute text-gray-500 top-3 left-3" />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-[0.75rem] py-[0.5rem] text-white transition-all duration-[0.25s] ease-in-out transform bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-[0.15rem] focus:ring-purple-[0.5] focus:ring-offset-[0.15rem] hover:scale-[1.02]"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-[0.5rem] text-center text-gray-700">
            {"Don't have an account? "}
            <Link to="/register" className="font-semibold text-purple-[0.6] hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
