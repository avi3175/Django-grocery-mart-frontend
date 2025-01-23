import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sortOrder, setSortOrder] = useState(""); // Sorting state
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    setIsLoggedIn(!!accessToken);

    axios
      .get("https://django-grocery-mart-backend.onrender.com/api/products/?format=json")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    if (accessToken) {
      fetchCart();
    }
  }, []);

  const fetchCart = () => {
    axios
      .get("https://django-grocery-mart-backend.onrender.com/api/cart_and_order/cart/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      alert("Please login or signup to add items to the cart.");
      return;
    }

    const totalPrice = parseFloat(product.price) * 1;

    axios
      .post(
        "https://django-grocery-mart-backend.onrender.com/api/cart_and_order/cart/",
        { product_id: product.id, quantity: 1, total_price: totalPrice },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(() => {
        fetchCart();
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  const handleRemoveFromCart = (productId) => {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      const newQuantity = existingItem.quantity - 1;

      if (newQuantity > 0) {
        handleUpdateCart(productId, newQuantity);
      } else {
        axios
          .delete(`https://django-grocery-mart-backend.onrender.com/api/cart_and_order/cart/${productId}/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then(() => {
            fetchCart();
          })
          .catch((error) => {
            console.error("Error removing from cart:", error);
          });
      }
    }
  };

  const handleUpdateCart = (productId, quantity) => {
    axios
      .patch(
        `https://django-grocery-mart-backend.onrender.com/api/cart_and_order/cart/${productId}/`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(() => {
        fetchCart();
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  };

  const handleOrderNow = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please log in or sign up to place an order.");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        product_id: item.product?.id,
        quantity: item.quantity,
        price: parseFloat(item.total_price).toFixed(2),
      })),
      total_price: cart.reduce(
        (sum, item) => sum + parseFloat(item.total_price || 0),
        0
      ).toFixed(2),
    };

    try {
      const response = await fetch(
        "https://django-grocery-mart-backend.onrender.com/api/cart_and_order/order/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Order placed successfully!");
        setCart([]);
      } else {
        const errorData = await response.json();
        alert("Failed to place the order: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortOrder === "desc") {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    return 0;
  });

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-3/4">
        <div className="flex justify-around my-4">
          {["All", "Vegetables", "Meat", "Fish"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 font-bold ${
                filter === category ? "bg-red-700 text-white" : "bg-yellow-400"
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}

          {/* Dropdown menu for sorting */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="ml-4 px-4 py-2 bg-gray-200 rounded"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover mb-4"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-700">Price: ${product.price}</p>
              <p className="text-gray-700">Category: {product.category}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 bg-red-700 font-extrabold text-white px-4 py-2 rounded hover:bg-yellow-400 hover:text-black"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/4 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4"
              >
                <div>
                  <p className="font-bold border-b-2 p-1 bg-yellow-400 text-black">
                    {item.product_name}
                  </p>
                  <p>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="px-2 bg-red-700 text-white rounded font-extrabold"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateCart(item.id, item.quantity + 1)
                      }
                      className="px-2 bg-lime-500 font-extrabold text-white rounded"
                    >
                      +
                    </button>
                  </p>
                  <p>Total: ${Number(item.total_price).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <button
              onClick={handleOrderNow}
              className="w-full font-extrabold bg-red-700 text-white px-4 py-2 rounded hover:bg-yellow-400 hover:text-black"
            >
              Order Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
