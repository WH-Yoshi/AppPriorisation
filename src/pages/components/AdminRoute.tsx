import { Navigate } from "react-router";
import {JSX} from "react";
import {CheckIsAdmin} from "./CheckIsAdmin.tsx";

type PrivateRouteProps = {
    children: JSX.Element;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
    if (!CheckIsAdmin()) {
        return <Navigate to="/" />;
    }
    return children;
}