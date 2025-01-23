import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const commentsApiUrl = "https://django-grocery-mart-backend.onrender.com/api/comments/comments/";
  const productsApiUrl = "https://django-grocery-mart-backend.onrender.com/api/products/";

  useEffect(() => {
    // Check login state
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);

    // Fetch products
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      // Fetch comments for the selected product
      fetchComments();
    }
  }, [selectedProduct]);

  const fetchProducts = () => {
    axios
      .get(productsApiUrl)
      .then((response) => {
        setProducts(response.data);
        // Set default product if not already selected
        if (!selectedProduct && response.data.length > 0) {
          setSelectedProduct(response.data[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const fetchComments = () => {
    axios
      .get(commentsApiUrl, {
        params: { product: selectedProduct },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Please log in to add a comment.");
      return;
    }

    const token = localStorage.getItem("access_token");

    axios
      .post(
        commentsApiUrl,
        { product: selectedProduct, comment: newComment, rating: newRating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setNewComment("");
        setNewRating(1);
        fetchComments(); // Refresh comments after adding
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };

  return (
    <div className="comments-section w-[60%] m-auto p-10">
      <h2 className=" text-red-700 font-extrabold text-3xl mt-10 mb-1 p-4 ">Provide Comments & Reviews</h2>
      <hr  className="p-1 text-black bg-red-700 mb-4"/>
      {/* Product Selection */}
      <div className="mb-4">
        <label htmlFor="product-select" className="block font-bold mb-2 bg-red-700 text-white p-2">
          Select a Product:
        </label>
        <select
          id="product-select"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full p-2 border rounded bg-red-700 text-white font-extrabold"
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-2 border rounded mb-2 bg-red-700 text-white"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <div className="flex items-center mb-2 bg-red-700 p-2">
          <label className="mr-2 text-white font-bold">Rating:</label>
          <select
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            className="border rounded p-2 bg-yellow-400"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-red-700 text-white px-4 py-2  font-bold rounded hover:bg-yellow-400 hover:text-blue-900"
        >
          Submit
        </button>
      </form>

      {/* Comments List */}
      {/* {comments.length === 0 ? (
        <p>No comments yet for this product. Be the first to leave one!</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border p-2">Product</th>
              <th className="border p-2">Comment</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Posted On</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td className="border p-2">{comment.product_name}</td>
                <td className="border p-2">{comment.comment}</td>
                <td className="border p-2">{'★'.repeat(comment.rating)}</td>
                <td className="border p-2">{new Date(comment.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
    </div>
  );
};

export default Comments;
