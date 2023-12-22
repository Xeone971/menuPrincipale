// Import necessary libraries and components from respective paths
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Test from './components/AnimeDebut/animeDebut';
import Carou from './components/Carousal/Carousel';
// import Menu from './components/Carousal/menu'; // Commented out import
import './index.scss';
import { Navigate } from 'react-router-dom';
import InfoStyle from './components/pages/InfoStyle';
import Menu from './components/pages/Menu/Menu';

// Define routes for the application
const routes = [
  {
    path: "/", // Root path
    element: <Test /> // Render Test component when path is '/'
  },
  {
    path: "/Carou", // Path '/Carou'
    element: <Carou /> // Render Carou component when path is '/Carou'
  },
  {
    path: "/menu", // Path '/menu'
    element: <Menu /> // Render Menu component when path is '/menu'
  },
  {
    path: "/infos/:style", // Dynamic path with parameter ':style'
    element: <InfoStyle /> // Render InfoStyle component when path matches pattern '/infos/:style'
  },
  {
    path: "/contact", // Path '/contact'
    element: <Menu /> // Render Menu component when path is '/contact'
  },
  {
    path:"*", // Default path for unmatched routes
    element:<Navigate to="/" replace /> // Navigate to root '/' when no other route matches
  }
];

// Create a router using the defined routes
const router = createBrowserRouter(routes);

// Create a root element to render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React application with the router and strict mode
root.render(
  <React.StrictMode>
    {/* Provide the router to the entire application */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
