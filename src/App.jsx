import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Navbar"
import Signup from "./Signup"
import Home from "./Home";
import Comments from "./Comments";
import Slider from "./Slider";
import Testimony from "./Testimony"
import Footer from "./Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar></Navbar>
      <Slider></Slider>
      <p className="p-5 bg-red-700 text-white font-extrabold text-5xl inline-block m-10">SHOP NOW</p>
      <Home></Home>
      <Testimony></Testimony>
      <Comments></Comments>
      <Footer></Footer>
    </>
  );
}

export default App;
