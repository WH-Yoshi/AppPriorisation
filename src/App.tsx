import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./pages/Root.tsx";
import "./Styles.scss";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App
