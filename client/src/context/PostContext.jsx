import React, { createContext, useState, useEffect, useContext } from 'react';
import useApi from '../hooks/useApi';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { data: fetchedPosts, loading: postsLoading, error: postsError, fetchData: fetchAllPosts } = useApi('/api/posts');
  const { data: fetchedCategories, loading: categoriesLoading, error: categoriesError, fetchData: fetchAllCategories } = useApi('/api/categories');

  useEffect(() => {
    fetchAllPosts();
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories);
    }
  }, [fetchedCategories]);

  // Functions to update state after CUD operations
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const updatePostInList = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  };

  const deletePostFromList = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        postsLoading,
        postsError,
        fetchAllPosts,
        addPost,
        updatePostInList,
        deletePostFromList,
        categories,
        categoriesLoading,
        categoriesError,
        fetchAllCategories,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);