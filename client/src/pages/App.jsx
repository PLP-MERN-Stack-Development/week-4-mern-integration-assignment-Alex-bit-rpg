import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './pages/PostList';
import SinglePost from './pages/SinglePost';
import PostForm from './pages/PostForm';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/edit/:id" element={<PostForm />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          {/* Add more routes here for other features */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;