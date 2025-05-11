import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import Root from "./pages/Root/Root.tsx";
import "./Styles.scss";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                { path: "/", element: <Navigate to="/home" /> },
                { path: "home", element: <Home /> },
                { path: "login", element: <Login /> },
                { path: "register", element: <Register /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App
