import { Navigate } from "react-router";
import {JSX} from "react";

const NonConnectedPrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = sessionStorage.getItem("token");
    return token ? <Navigate to="/dashboard" /> : children;
};

export default NonConnectedPrivateRoute;
