import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./page/SingUp.jsx";
import Login from "./page/Login.jsx";
import HeroPage from "./page/HeroPage.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Admin from "./page/Admin.jsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/directory/:dirId",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/signup",
    element: (
      <GoogleOAuthProvider clientId={clientId}>
        <SignUp />{" "}
      </GoogleOAuthProvider>
    ),
  },
  {
    path: "/login",
    element: (
      <GoogleOAuthProvider clientId={clientId}>
        <Login />{" "}
      </GoogleOAuthProvider>
    ),
  },
  {
    path: "/",
    element: <HeroPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <StrictMode>
      <App />
    </StrictMode>
  </RouterProvider>
);
