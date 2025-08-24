<<<<<<< HEAD
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import RepositoriesPage from './pages/RepositoriesPage.jsx'
import './index.css'

const router = createBrowserRouter(
  [
    {
      path: '*',
      element: <App />, 
      children: [
        { path: 'repositories', element: <RepositoriesPage /> },
        // ...add other routes here...
      ]
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
>>>>>>> bf2dd6c (Resolve merge conflict in frontend/package.json)
