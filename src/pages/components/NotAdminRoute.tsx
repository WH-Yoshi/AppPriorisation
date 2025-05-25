import { Navigate } from "react-router";
import { JSX, useEffect, useState } from "react";
import { CheckIsAdmin } from "./CheckIsAdmin.tsx";

type PublicOnlyRouteProps = {
    children: JSX.Element;
};

export default function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const check = async () => {
            const result = await CheckIsAdmin();
            setIsAdmin(result);
        };
        check();
    }, []);

    if (isAdmin === null) return null; // ou un petit loader si tu veux

    if (isAdmin) {
        return <Navigate to="/admin" />;
    }

    return children;
}
