import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "./AuthService"; // Your login service
import GoogleButton from "./GoogleButton";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData.email, formData.password); // Assume `login` returns a user object
      const userDetails = {
        name: user.name || formData.email, // Use name if available, otherwise fallback to email
      };
      localStorage.setItem("normalUser", JSON.stringify(userDetails)); // Store user details
      toast.success("Login successful!");
      navigate('/post')
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Enter your email and password to sign in!
          </p>
          <div className="bg-white shadow-lg rounded-lg p-8 mt-8">
            <GoogleButton />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="mail@example.com"
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Min. 8 characters"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Keep me logged in
                  </label>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </form>
            <p className="text-sm text-gray-600 text-center mt-6">
              Not registered yet?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Background Section */}
      <div className="lg:w-1/2 bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex flex-col justify-center items-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Horizon UI</h1>
          <div className="w-full max-w-sm">
            <img
              src="https://avatars.githubusercontent.com/u/103844468?s=280&v=4"
              alt="Horizon UI Visual"
              className="rounded-lg shadow-lg mb-8"
            />
          </div>
          <nav className="text-sm text-gray-300">
            <ul className="flex flex-wrap justify-center space-x-4">
              <li>
                <a href="#" className="hover:underline">Marketplace</a>
              </li>
              <li>
                <a href="#" className="hover:underline">License</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Terms of Use</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Blog</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
