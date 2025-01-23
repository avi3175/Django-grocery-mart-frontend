import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://django-grocery-mart-backend.onrender.com/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store tokens and set logged-in state
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        navigate("/"); // Redirect to the home page
      } else {
        setError(data.detail || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div  className="mt-10 p-10"
        style={{
          backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/029/629/207/non_2x/shopping-cart-full-of-food-and-drinks-and-supermarket-shelves-behind-grocery-shopping-concept-free-photo.jpeg')",  // Replace with your background image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} >
        <h2 className=" opacity-80 text-4xl text-center text-white p-5 bg-red-700 inline-block font-extrabold mb-4">
          Login
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="opacity-70 max-w-md mx-auto p-6 rounded-lg shadow-md bg-red-700" >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-rose-900 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Login;
