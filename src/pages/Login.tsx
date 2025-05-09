function Login() {

    return (
        <>
            <section id="login">
                <article className="title">
                    <h1>Connexion</h1>
                </article>
                <article className="connexion">
                    <h2>Connectez-vous afin de suivre vos travaux</h2>
                    <a>Pas encore de compte ?</a>
                    <article className="form">
                        <form>
                            <section>
                                <label htmlFor="username">Nom d'utilisateur</label>
                                <input type="text" id="username" name="username" required />
                            </section>
                            <section>
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password" id="password" name="password" required />
                            </section>
                            <button type="submit">Se connecter</button>
                        </form>
                    </article>
                </article>
            </section>
        </>
    )
}

export default Login;