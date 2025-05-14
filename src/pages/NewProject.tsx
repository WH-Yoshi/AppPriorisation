import { useState } from "react";
import * as React from "react";
import CreationProfil from "./CreationProfil.tsx";

export default function NewProject() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedOption1, setSelectedOption1] = useState("");

    const handleNext = () => {
        if (currentPage < 2) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleOptionChange = (option: string) => {
        setSelectedOption1(option);
    };

    return (
        <>
            <section id="new-project">
                <article className="title">
                    <h1>Nouveau Logement</h1>
                </article>
                <section className="content">
                    <div className="name-description">
                        <input
                            type="text"
                            value={name}
                            placeholder="Nom"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            id="description"
                            value={description}
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <section className="carousel">
                        <div
                            className="carousel-container"
                            style={{
                                transform: `translateX(-${currentPage * 50}vw)`,
                            }}
                        >
                            <div className="page">
                                <CreationProfil onOptionChange={handleOptionChange} />
                            </div>
                            <div className="page">
                                <h2>Page 2</h2>
                                <p>Informations pour la deuxième page.</p>
                            </div>
                            <div className="page">
                                <h2>Page 3</h2>
                                <p>Informations pour la troisième page.</p>
                            </div>
                        </div>
                        <div className="carousel-controls">
                            <button onClick={handlePrevious} disabled={currentPage === 0}>
                                Précédent
                            </button>
                            <button onClick={handleNext} disabled={currentPage === 2}>
                                Suivant
                            </button>
                        </div>
                    </section>
                </section>
            </section>
        </>
    );
}