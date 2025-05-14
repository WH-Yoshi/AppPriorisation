import { Navigate } from "react-router";
import {JSX} from "react";

const ConnectedPrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = sessionStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

export default ConnectedPrivateRoute;
