import { useState } from "react";
import {RadioGroup, FormControlLabel, Radio} from "@mui/material";
import * as React from "react";
import {useNavigate} from "react-router";

export default function CreationProfil() {
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const options = {
        "Ecolo": "Je veux réduire mon empreinte écologique.",
        "Economie": "Je veux économiser de l’argent à court terme.",
        "Valorisation": "Je veux valoriser mon bien. ",
        "Confort": "Je veux améliorer mon confort et bien-être."
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/profil-utilisateur", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ objectif_principal: selectedOption }),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi des données");
            }
            alert("Données envoyées avec succès !");
            navigate("/creation-profil2");
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
            alert("Erreur lors de l'envoi des données.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section id="creation-profil">
                <article className="title">
                    <h1>Création de votre profil rénovateur</h1>
                </article>
                <section className="questions">
                    <article className="title-question">
                        <h2>Que recherchez-vous ?</h2>
                    </article>
                    <form onSubmit={handleSubmit} >
                        <RadioGroup
                            onChange={handleRadioChange}
                            value={selectedOption}
                        >
                            {Object.entries(options).map(([key, value], index) => (
                                <div key={index} className="radio-option">
                                    <FormControlLabel
                                        value={key}
                                        id={`option-${index}`}
                                        control={
                                            <Radio sx={{
                                                color: "white",
                                                "&.Mui-checked": {
                                                    color: "white",
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 28,
                                                },
                                            }} />
                                        }
                                        label={value}
                                    />
                                </div>
                            ))}
                        </RadioGroup>
                        <article className="bottom-button">
                            <button
                                type="submit"
                                disabled={!selectedOption || loading}
                                className=""
                            >
                                {loading ? "Envoi en cours..." : "Envoyer"}
                            </button>
                        </article>

                    </form>
                </section>
            </section>
        </>
    );
}
