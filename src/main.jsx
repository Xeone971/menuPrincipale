import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Test from './components/AnimeDebut/animeDebut'
import Carou from './components/Carousal/Carousel'
// import Menu from './components/Carousal/menu';
import './index.scss'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
// import './index.css';
// import Menu from './pages/Menu/Menu';
// import InfoStyle from './pages/InfoStyle';
// import { Navigate } from 'react-router-dom';

const routes = [
  {
    path: "/",
    element: <Test />
  },
  {
    path: "/Carou",
    element: <Carou />
  }
  // },
  // {
  //   path: "/contact",
  //   element: <Menu />
  // }
  
  // {
  //   path: "/contact",
  //   element: <Menu />
  // },
  // {
  //   path:"*",
  //   element:<Navigate to="/" replace />
  // }
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);