import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./page/SingUp.jsx";
import Login from "./page/Login.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/directory/:dirId",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
  {
    path: '/login',
    element: <Login/>
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <StrictMode>
      <App />
    </StrictMode>
  </RouterProvider>
);
