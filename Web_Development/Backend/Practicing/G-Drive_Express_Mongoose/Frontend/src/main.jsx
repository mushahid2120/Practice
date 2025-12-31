import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./page/SingUp.jsx";
import Login from "./page/Login.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "334126242922-u35qsecmr9pjg1o7bg64ga2bucons5qh.apps.googleusercontent.com";

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
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <StrictMode>
      <App />
    </StrictMode>
  </RouterProvider>
);
