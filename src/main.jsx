import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./Login.jsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Signup.jsx";
import OrderHistory from "./OrderHistory.jsx";
import Comments from "./Comments.jsx";
import YourComments from "./YourComments.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <App></App>
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login></Login>
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <Signup></Signup>
      </div>
    ),
  },
  {
    path: "/order-history",
    element: (
      <div>
        <OrderHistory></OrderHistory>
      </div>
    ),
  },
  {
    path: "/comments",
    element: (
      <div>
        <Comments></Comments>
      </div>
    ),
  },
  {
    path: "/your-comments",
    element: (
      <div>
        <YourComments></YourComments>
      </div>
    ),
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
