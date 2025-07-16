import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

const PostList = () => {
  const { data: posts, loading, error, fetchData } = useApi('/api/posts');

  useEffect(() => {
    fetchData(); // Fetch posts on component mount
  }, []);


      const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      // Optimistic update: Remove from UI immediately
      const originalPosts = posts;
      setPosts(posts.filter(post => post._id !== id)); // Assuming `posts` is managed by useState directly

      try {
        await fetchData(`/api/posts/${id}`, 'DELETE');
        // If successful, UI is already updated
      } catch (err) {
        // If error, revert to original posts
        setPosts(originalPosts);
        alert('Failed to delete post: ' + err.message);
      }
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <Link to="/posts/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Create New Post
      </Link>
      {posts && posts.length === 0 ? (
        <p>No posts found. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts && posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {new Date(post.createdAt).toLocaleDateString()} {post.category && ` | Category: ${post.category.name}`}
              </p>
              <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
              <div className="flex justify-between items-center">
                <Link to={`/posts/${post._id}`} className="text-blue-500 hover:underline">
                  Read More
                </Link>
                <div>
                  <Link to={`/posts/edit/${post._id}`} className="text-green-500 hover:underline mr-4">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
