import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './Components/Header.jsx'
import Home from './Components/Home.jsx'
const About =lazy(()=>import('./Components/About.jsx'))
import Contact from './Components/Contact.jsx'
import Modal from './Components/Modal.jsx'

const router=createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: 'about',
        element: <About/>
      },
      {
        path: 'contact',
        element: <Contact/>
      }, 
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
