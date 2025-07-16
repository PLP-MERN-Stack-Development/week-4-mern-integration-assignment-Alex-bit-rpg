import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          MERN Blog
        </Link>
        <div>
          <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Posts
          </Link>
          <Link to="/posts/new" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            New Post
          </Link>
          {/* Add links for authentication later */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;