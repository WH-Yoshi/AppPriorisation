import {useLocation, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {CheckIsAdmin} from "../components/CheckIsAdmin.tsx";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isAdmin, setIsAdmin] = useState(false);
    const token_exist = sessionStorage.getItem("token");

    useEffect(() => {
        const checkAdmin = async () => {
            if (token_exist) {
                const result = await CheckIsAdmin();
                setIsAdmin(result);
            }
        };
        checkAdmin();
    }, [token_exist]);

    function logout() {
        localStorage.removeItem("token");
        navigate("/home");
    }

    const hiddenPaths = ["/login", "/register", "/creation-profil", "/dashboard", "/admin"];

    return (
        <section id="header">
            <section>
                <article className="left">
                    <h1 onClick={() => navigate("/home")}>Priorisation rénovation</h1>
                </article>
                <article className="right">
                    {!hiddenPaths.includes(location.pathname) && (
                        <button id="login" type="button" onClick={() => navigate("/login")}>Login</button>
                    )}
                    {token_exist && (
                        <>
                            <button id="logout" type="button" onClick={logout}>Logout</button>
                            {isAdmin && (
                                <button id="admin-dashboard-button" type="button" onClick={() => navigate("/admin")}>
                                    Admin Dashboard
                                </button>
                            )}
                        </>
                    )}
                </article>
            </section>
        </section>
    );
}

export default Header;
