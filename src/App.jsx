import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Navbar";
import Signup from "./Signup";
import Home from "./Home";
import Comments from "./Comments";
import Slider from "./Slider";
import Testimony from "./Testimony";
import Footer from "./Footer";

// Stripe imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe outside of a component’s render to avoid reinitializing on each render.
const stripePromise = loadStripe("your-publishable-key-here"); // Replace with your actual Stripe publishable key

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Slider />
      <p className="p-5 bg-red-700 text-white font-extrabold text-5xl inline-block m-10">SHOP NOW</p>

      {/* Wrap Home component with Elements */}
      <Elements stripe={stripePromise}>
        <Home />
      </Elements>

      <Testimony />
      <Comments />
      <Footer />
    </>
  );
}

export default App;
