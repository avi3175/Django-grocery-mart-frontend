import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const YourComments = () => {
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    setIsLoggedIn(!!accessToken);

    if (accessToken) {
      fetchComments();
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const fetchComments = () => {
    axios
      .get("https://django-grocery-mart-backend.onrender.com/api/comments/comments/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 bg-yellow-400 inline-block p-4">Your Comments</h2>
        {comments.length === 0 ? (
          <p>No comments available for this product.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-lime-400 text-black">
                <th className="border border-gray-300 px-4 py-2">Username</th>{" "}
                {/* Updated header */}
                <th className="border border-gray-300 px-4 py-2">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Comment</th>
                <th className="border border-gray-300 px-4 py-2">Rating</th>
                <th className="border border-gray-300 px-4 py-2">Posted On</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
                <tr
                  key={comment.id}
                  className={`${
                    index % 2 === 0 ? "bg-green-950" : "bg-green-950"
                  } hover:bg-green-950`}
                >
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    {comment.user}
                  </td>{" "}
                  {/* Show user_username */}
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    {comment.product_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    {comment.comment}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    {"★".repeat(comment.rating)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default YourComments;
