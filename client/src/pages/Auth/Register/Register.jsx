import { CiUser } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo_icon from "../../../assets/logo_icon.png";

const Register = () => {
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

        {/* Right Side: Registration Form */}
        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg md:w-1/2 bg-opacity-90">
          <h1 className="mb-4 text-3xl font-bold text-center text-gray-800">Sign Up</h1>
          <form className="space-y-4"> 
            {/* Full Name Field */}
            <div className="relative">
              <input
                id="fullName"
                type="text"
                placeholder="Full Name"
                className="w-full py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                required
              />
              <CiUser className="absolute text-gray-500 top-3 left-3" />
            </div>

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

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                required
              />
              <FaLock className="absolute text-gray-500 top-3 left-3" />
            </div>

            {/* Gender Options */}
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="genderMale"
                  type="radio"
                  value="male"
                  name="gender"
                  className="w-4 h-4 text-purple-600 border-gray-300 "
                  required
                />
                <label htmlFor="genderMale" className="ml-2 text-gray-700">Male</label>
              </div>
              <div className="flex items-center">
                <input
                  id="genderFemale"
                  type="radio"
                  value="female"
                  name="gender"
                  className="w-4 h-4 text-purple-600 border-gray-300 "
                  required
                />
                <label htmlFor="genderFemale" className="ml-2 text-gray-700">Female</label>
              </div>
            </div>

            {/* Profile Picture Upload */}
            <div>
              <h4 className="mb-1 text-lg font-normal text-gray-800">Upload Profile Picture</h4>
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                className="w-full text-gray-700 file:mr-4 file:py-[0.5rem] file:px-[0.5rem] file:rounded-full file:border-none file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-[0.75rem] py-[0.5rem] text-white transition-all duration-[0.25s] ease-in-out transform bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-[0.15rem] focus:ring-purple-[0.5] focus:ring-offset-[0.15rem] hover:scale-[1.02]"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-[0.5rem] text-center text-gray-700">
            {"Already have an account? "}
            <Link to="/login" className="font-semibold text-purple-[0.6] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;