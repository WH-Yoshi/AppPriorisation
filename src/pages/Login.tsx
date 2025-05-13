import {useNavigate} from "react-router";
import {useState} from "react";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            sessionStorage.setItem("token", data.access_token);

            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
            alert("Login failed. Please check your credentials.");
        }
    };


    return (
        <>
            <section id="login-register">
                <article className="title">
                    <h1>Connexion</h1>
                </article>
                <article className="connexion">
                    <h2>Connectez-vous afin de suivre vos travaux</h2>
                    <a onClick={(e) => { e.preventDefault(); navigate("/register"); }}>Pas encore de compte ?</a>
                    <article className="form">
                        <form onSubmit={handleLogin}>
                            <section>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </section>
                            <section>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Mot de passe"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </section>
                            <button type="submit">Se connecter</button>
                        </form>
                    </article>
                </article>
            </section>
        </>
    )
}