import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

const SinglePost = () => {
  const { id } = useParams();
  const { data: post, loading, error, fetchData } = useApi(`/api/posts/${id}`);

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Posts
      </Link>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-6">
        {new Date(post.createdAt).toLocaleDateString()} {post.category && ` | Category: ${post.category.name}`}
      </p>
      {post.featuredImage && (
        <img src={post.featuredImage} alt={post.title} className="w-full h-auto object-cover mb-6 rounded-lg" />
      )}
      <div className="prose lg:prose-lg mb-8" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <div className="flex justify-end">
        <Link to={`/posts/edit/${post._id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
          Edit Post
        </Link>
        {/* Delete functionality can be added here or on the list view */}
      </div>
    </div>
  );
};

export default SinglePost;
