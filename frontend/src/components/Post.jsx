import React, { useState, useEffect } from "react";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Posts</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-indigo-600 border-dotted rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transform transition duration-300 hover:scale-105"
            >
              <h2 className="text-xl font-bold text-indigo-600 mb-2 truncate">
                {post.title}
              </h2>
              <p className="text-gray-700 text-sm mb-4">{post.body.slice(0, 100)}...</p>
              <button className="text-indigo-600 font-medium hover:text-indigo-800">
                Read More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
