import {useNavigate} from "react-router";

function Register() {
    const navigate = useNavigate();

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
                        <form>
                            <section>
                                <label htmlFor="email">Email</label>
                                <input type="text" id="email" name="email" required />
                            </section>
                            <section>
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password" id="password" name="password" required />
                            </section>
                            <button type="submit">Continuer</button>
                        </form>
                    </article>
                </article>
            </section>
        </>
    )
}

export default Register;