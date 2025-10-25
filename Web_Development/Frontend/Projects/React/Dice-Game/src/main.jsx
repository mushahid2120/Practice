import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import GamePage from './Components/GamePage.jsx'


const router=createBrowserRouter([
  {
    path: '/game',
    element: <GamePage/>
  },
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/:contact',
    element: <h1>Contact Page</h1>
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
