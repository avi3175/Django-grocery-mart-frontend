import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Add state to toggle payment form
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    setIsLoggedIn(!!accessToken);

    axios.get("https://django-grocery-mart-backend.onrender.com/api/products/")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));

    if (accessToken) fetchCart();
  }, []);

  const fetchCart = () => {
    axios.get("https://django-grocery-mart-backend.onrender.com/api/cart_and_order/cart/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    })
      .then((response) => setCart(response.data))
      .catch((error) => console.error("Error fetching cart:", error));
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) return alert("Please log in or sign up first.");

    axios.post(
      "https://django-grocery-mart-backend.onrender.com/api/cart_and_order/cart/",
      { product_id: product.id, quantity: 1, total_price: parseFloat(product.price) },
      { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
    ).then(fetchCart)
     .catch((error) => console.error("Error adding to cart:", error));
  };

  const handleRemoveFromCart = (productId) => {
    axios.delete(
      `https://django-grocery-mart-backend.onrender.com/api/cart_and_order/cart/${productId}/`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
    ).then(fetchCart)
     .catch((error) => console.error("Error removing from cart:", error));
  };

  const handleUpdateCart = (productId, quantity) => {
    axios.patch(
      `https://django-grocery-mart-backend.onrender.com/api/cart_and_order/cart/${productId}/`,
      { quantity },
      { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
    ).then(fetchCart)
     .catch((error) => console.error("Error updating cart:", error));
  };

  const handleOrderNow = async () => {
    if (!cart.length) return alert("Your cart is empty.");
    if (!localStorage.getItem("access_token")) return alert("Please log in to place an order.");

    // Show payment form
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // Create a payment intent on the backend
      const { data } = await axios.post(
        'https://django-grocery-mart-backend.onrender.com/api/cart_and_order/create-checkout-session/',
        {
          totalPrice: cart.reduce((sum, item) => sum + parseFloat(item.total_price || 0), 0).toFixed(2),
          cartItems: cart.map(item => ({
            product_id: item.product?.id,
            quantity: item.quantity,
            total_price: item.total_price,
          })),
        }
      );

      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Call your backend to update order status to paid
        await axios.post('https://django-grocery-mart-backend.onrender.com/api/cart_and_order/order/paid/', {
          orderId: data.order_id,
        });

        alert("Payment Successful!");
        setCart([]);
        setShowPaymentForm(false);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  const filteredProducts = filter === "All" ? products : products.filter((p) => p.category === filter);
  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortOrder === "asc" ? parseFloat(a.price) - parseFloat(b.price)
    : sortOrder === "desc" ? parseFloat(b.price) - parseFloat(a.price)
    : 0
  );

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-3/4">
        {/* Product Display */}
        <div className="flex justify-around my-4">
          {["All", "Vegetables", "Meat", "Fish"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 font-bold ${filter === category ? "bg-red-700 text-white" : "bg-yellow-400"}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="ml-4 px-4 py-2 bg-gray-200 rounded"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-4" />
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
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold border-b-2 p-1 bg-yellow-400 text-black">{item.product_name}</p>
                  <p>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="px-2 bg-red-700 text-white rounded font-extrabold"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateCart(item.id, item.quantity + 1)}
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

      {showPaymentForm && (
        <div className="w-full md:w-1/2 bg-white p-6 rounded shadow-md mx-auto mt-4">
          <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handlePaymentSubmit}>
            <div className="mb-4">
              <label htmlFor="card-element" className="block text-lg mb-2">Credit or Debit Card</label>
              <CardElement id="card-element" options={{ hidePostalCode: true }} />
            </div>
            <div className="mb-4 flex justify-between items-center">
              <p className="font-bold">Total: ${cart.reduce((sum, item) => sum + parseFloat(item.total_price || 0), 0).toFixed(2)}</p>
              <button
                type="submit"
                className="px-6 py-2 bg-red-700 text-white rounded"
                disabled={!stripe || loading}
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
