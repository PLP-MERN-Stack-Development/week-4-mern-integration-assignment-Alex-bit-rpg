MERN Stack Blog Application
________________________________________
Project Overview
This is a full-stack blog application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a robust platform for creating, viewing, updating, and deleting blog posts and managing categories. The application demonstrates seamless integration between front-end and back-end components, including database operations, API communication, and state management.
________________________________________
Features Implemented
This project includes the following core functionalities:
•	RESTful API: A robust backend API for managing blog posts and categories.
•	Post Management:
o	View all blog posts.
o	View a single blog post.
o	Create new blog posts.
o	Edit existing blog posts.
o	Delete blog posts.
•	Category Management:
o	View all blog categories.
o	Create new blog categories.
•	Data Persistence: Posts and categories are stored in a MongoDB database.
•	Input Validation: Server-side input validation using express-validator to ensure data integrity.
•	Error Handling: Custom error handling middleware for graceful API responses.
•	Responsive UI: A basic, responsive user interface built with React.js and styled with [Tailwind CSS - if you used it, otherwise remove this].
•	Client-Side Routing: Seamless navigation using React Router.
•	State Management: Efficient state management in React using useState, useEffect, and a custom API hook.
•	API Communication: Front-end communicates with the backend API using a custom useApi hook.
•	Environment Variables: Secure configuration management using .env files.
•	Proxy Configuration: Vite proxy setup for smooth API calls from the client to the server during development.
________________________________________
Setup Instructions
To get this project up and running on your local machine, follow these steps:
Prerequisites
Make sure you have the following installed:
•	Node.js (v18+)
•	npm (Node Package Manager - comes with Node.js)
•	MongoDB (running locally or a cloud instance like MongoDB Atlas)
1. Clone the Repository
First, clone your repository (which was created by GitHub Classroom):
Bash
git clone [YOUR_REPOSITORY_URL]
cd [YOUR_REPOSITORY_NAME] # e.g., cd mern-blog-app
2. Backend Setup
Navigate to the server directory and install dependencies:
Bash
cd server
npm install
Configure Environment Variables (Server)
Create a .env file in the server directory and add the following:
Code snippet
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-blog # Replace with your MongoDB connection string if different
# JWT_SECRET=your_super_secret_jwt_key # Uncomment and set a strong secret when implementing authentication
3. Frontend Setup
Navigate to the client directory and install dependencies:
Bash
cd ../client # Go back to root and then into client
npm install
Configure Environment Variables (Client)
Create a .env file in the client directory and add the following:
Code snippet
VITE_API_BASE_URL=/api # This should match your Vite proxy configuration
4. Start the Development Servers
You'll need two separate terminal windows for this.
Start the Backend Server
In the server directory:
Bash
npm run dev
The server should start on http://localhost:5000 (or your specified PORT).
Start the Frontend Development Server
In the client directory:
Bash
npm run dev
The React application should open in your browser, typically at http://localhost:5173.
________________________________________
API Documentation
The backend exposes the following RESTful API endpoints:
Base URL: /api
Endpoint	Method	Description	Request Body (Example)	Response (Success Example)
/api/posts	GET	Get all blog posts.	None	[ { _id: '...', title: '...', content: '...', category: { _id: '...', name: '...' }, ... }, ... ]
/api/posts/:id	GET	Get a specific blog post by ID.	None	{ _id: '...', title: '...', content: '...', category: { _id: '...', name: '...' }, ... }
/api/posts	POST	Create a new blog post.	{ "title": "New Post", "content": "This is content.", "category": "categoryId" }	{ _id: '...', title: '...', content: '...', category: '...', ... }
/api/posts/:id	PUT	Update an existing blog post by ID.	{ "title": "Updated Title", "content": "Updated content." }	{ _id: '...', title: '...', content: '...', ... }
/api/posts/:id	DELETE	Delete a blog post by ID.	None	{ "id": "...", "message": "Post removed" }
/api/categories	GET	Get all categories.	None	[ { _id: '...', name: '...' }, ... ]
/api/categories	POST	Create a new category.	{ "name": "Technology" }	{ _id: '...', name: '...', ... }
Export to Sheets
Error Responses: For invalid requests or server errors, the API will return a JSON object with an error message and an appropriate HTTP status code (e.g., 400 Bad Request, 404 Not Found, 500 Internal Server Error).
________________________________________
Screenshots
(Replace these placeholders with actual screenshots of your running application)
Home Page (Post List)
Single Post View
Create/Edit Post Form
________________________________________
Project Structure
mern-blog/
├── client/                     # React frontend application
│   ├── public/                 # Public assets
│   ├── src/                    # Source code for React app
│   │   ├── assets/             # Images, icons, etc.
│   │   ├── components/         # Reusable React components (Navbar, Footer, etc.)
│   │   ├── hooks/              # Custom React hooks (e.g., useApi.js)
│   │   ├── pages/              # Main page components (PostList, SinglePost, PostForm)
│   │   ├── services/           # (Optional) Dedicated API service files
│   │   ├── App.jsx             # Main application component with routing
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles
│   ├── .env.example            # Example client environment variables
│   ├── index.html              # HTML entry file
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration (including proxy)
└── server/                     # Node.js/Express.js backend API
    ├── config/                 # Database connection configuration
    │   └── db.js               # MongoDB connection
    ├── controllers/            # Business logic for API endpoints
    │   ├── postController.js
    │   └── categoryController.js
    ├── models/                 # Mongoose schemas for data models
    │   ├── Post.js
    │   └── Category.js
    ├── middleware/             # Express middleware (e.g., error handling, authentication)
    │   └── errorMiddleware.js
    ├── routes/                 # API route definitions
    │   ├── postRoutes.js
    │   └── categoryRoutes.js
    ├── .env.example            # Example server environment variables
    ├── server.js               # Express application entry point
    ├── package.json            # Backend dependencies
    └── README.md               # This documentation

