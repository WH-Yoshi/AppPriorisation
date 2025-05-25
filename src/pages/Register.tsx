import {useNavigate} from "react-router";
import {useState} from "react";

export default function Register() {
    const navigate = useNavigate();
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch("https://apppriorisation-api-production.up.railway.app/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password, nom: nom, prenom: prenom }),
            });

            if (response.ok) {
                alert("Compte créé avec succès !");
                navigate("/dashboard");
            } else {
                if (response.status === 409) {
                    alert("Cet email est déjà utilisé. Connectez-vous maintenant.");
                    navigate("/login");
                }
                const data = await response.json();
                console.log(data)
                alert("Erreur lors de l'inscription");
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription", error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    return (
        <>
            <section id="login-register">
                <article className="title">
                    <h1>Enregistrement</h1>
                </article>
                <article className="connexion">
                    <h2>Créer un compte afin de suivre vos travaux</h2>
                    <a onClick={(e) => { e.preventDefault(); navigate("/login"); }}>J'ai déjà un compte.</a>
                    <article className="form">
                        <form onSubmit={handleRegister}>
                            <section>
                                <input
                                    type="text"
                                    id="nom"
                                    name="nom"
                                    value={nom}
                                    placeholder="Nom"
                                    onChange={(e) => setNom(e.target.value)}
                                    required
                                />
                            </section>
                            <section>
                                <input
                                    type="text"
                                    id="prenom"
                                    name="prenom"
                                    value={prenom}
                                    placeholder="Prénom"
                                    onChange={(e) => setPrenom(e.target.value)}
                                    required
                                />
                            </section>
                            <section>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </section>
                            <section>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    placeholder="Mot de passe"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </section>
                            <section>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    placeholder="Confirmer le mot de passe"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </section>
                            <button type="submit">Continuer</button>
                        </form>
                    </article>
                </article>
            </section>
        </>
    )
}