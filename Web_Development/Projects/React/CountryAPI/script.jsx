import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import Contact from "./Components/Contact"
import { createRoot } from "react-dom/client";
import Home from "./Components/Home.jsx";
import Error from "./Components/Error.jsx"
import CountriesDetail from "./Components/CountriesDetail.jsx";

const router=createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <Error/>,
        children:[
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/countryDetail",
                element:<CountriesDetail/>
            }
        ]
    }
])

const root = createRoot(document.querySelector("#root"));
root.render(<RouterProvider router={router}/>);
