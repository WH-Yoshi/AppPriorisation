import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import Root from "./pages/Root/Root.tsx";
import "./Styles.scss";
import Home from "./pages/Home.tsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                { path: "/", element: <Navigate to="/home" /> },
                { path: "home", element: <Home /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App
