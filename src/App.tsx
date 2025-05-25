import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import Root from "./pages/Root/Root.tsx";
import "./Styles.scss";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Test from "./pages/Test.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProjectDetails from "./pages/ProjectDetails.tsx";
import NonConnectedPrivateRoute from "./pages/components/NotConnectedProtectedRoute.tsx";
import ConnectedPrivateRoute from "./pages/components/ConnectedProtectedRoute.tsx";
import NewProject from "./pages/NewProject.tsx";
import AdminRoute from "./pages/components/AdminRoute.tsx"
import Admin from "./pages/Admin.tsx";
import PublicOnlyRoute from "./pages/components/NotAdminRoute.tsx";

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
                { path: "dashboard", element: <ConnectedPrivateRoute><PublicOnlyRoute><Dashboard /></PublicOnlyRoute></ConnectedPrivateRoute>},
                { path: "new-project", element: <ConnectedPrivateRoute><PublicOnlyRoute><NewProject onProjectCreated={function(): void {
                    throw new Error("Function not implemented.");
                } } /></PublicOnlyRoute></ConnectedPrivateRoute> },
                { path: "/project/:id", element: <ConnectedPrivateRoute><ProjectDetails /></ConnectedPrivateRoute> },
                { path: "/admin", element: <AdminRoute><Admin /></AdminRoute> },

                { path: "test", element: <Test /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App
