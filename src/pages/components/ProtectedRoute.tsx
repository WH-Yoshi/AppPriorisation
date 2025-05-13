import { Navigate } from "react-router";
import {JSX} from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
