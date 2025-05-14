import {useLocation, useNavigate} from "react-router";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const hiddenPaths = ["/login", "/register", "/creation-profil", "/dashboard"];

    const token_exist = localStorage.getItem("token");

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
                        <button id="logout" type="button" onClick={() => {}}>Logout</button>
                    )}
                </article>
            </section>
        </section>
    )
}

export default Header;