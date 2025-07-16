import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    featuredImage: '',
  });
  const [categories, setCategories] = useState([]);
  const { data: postToEdit, loading: postLoading, error: postError, fetchData: fetchPost } = useApi();
  const { loading: submitLoading, error: submitError, fetchData: submitForm } = useApi();
  const { data: fetchedCategories, loading: categoriesLoading, error: categoriesError, fetchData: fetchCategories } = useApi('/api/categories');


  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchPost(`/api/posts/${id}`);
    }
  }, [id]);

  useEffect(() => {
    if (postToEdit) {
      setFormData({
        title: postToEdit.title || '',
        content: postToEdit.content || '',
        category: postToEdit.category?._id || '',
        featuredImage: postToEdit.featuredImage || '',
      });
    }
  }, [postToEdit]);

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories);
    }
  }, [fetchedCategories]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await submitForm(`/api/posts/${id}`, 'PUT', formData);
      } else {
        await submitForm('/api/posts', 'POST', formData);
      }
      navigate('/'); // Redirect to post list after submission
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  if (postLoading || categoriesLoading) return <p>Loading form...</p>;
  if (postError) return <p className="error">Error loading post: {postError.message}</p>;
  if (categoriesError) return <p className="error">Error loading categories: {categoriesError.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Post' : 'Create New Post'}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="featuredImage" className="block text-gray-700 text-sm font-bold mb-2">
            Featured Image URL:
          </label>
          <input
            type="text"
            id="featuredImage"
            name="featuredImage"
            value={formData.featuredImage}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={submitLoading}
        >
          {submitLoading ? 'Submitting...' : (id ? 'Update Post' : 'Create Post')}
        </button>
        {submitError && <p className="error mt-4">Submission Error: {submitError.message}</p>}
      </form>
    </div>
  );
};

export default PostForm;
