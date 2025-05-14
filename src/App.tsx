import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import Root from "./pages/Root/Root.tsx";
import "./Styles.scss";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import CreationProfil from "./pages/CreationProfil.tsx";
import Test from "./pages/Test.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProjectDetails from "./pages/ProjectDetails.tsx";
import NonConnectedPrivateRoute from "./pages/components/NotConnectedProtectedRoute.tsx";
import ConnectedPrivateRoute from "./pages/components/ConnectedProtectedRoute.tsx";
import NewProject from "./pages/NewProject.tsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                { path: "/", element: <Navigate to="/home" /> },
                { path: "home", element: <Home /> },
                { path: "login", element: <NonConnectedPrivateRoute><Login /></NonConnectedPrivateRoute> },
                { path: "register", element: <NonConnectedPrivateRoute><Register /></NonConnectedPrivateRoute> },
                { path: "dashboard", element: <ConnectedPrivateRoute><Dashboard /></ConnectedPrivateRoute> },
                { path: "new-project", element: <ConnectedPrivateRoute><NewProject /></ConnectedPrivateRoute> },
                { path: "/project/:id", element: <ConnectedPrivateRoute><ProjectDetails /></ConnectedPrivateRoute> },
                { path: "creation-profil", element: <CreationProfil /> },

                { path: "test", element: <Test /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App
