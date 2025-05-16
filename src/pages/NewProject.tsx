import {useState} from "react";
import CreationProfil from "./CreationProfil.tsx";
import QuestionsLogement, {FormData1} from "./QuestionsLogement.tsx";
import QuestionsBudget, {FormData2} from "./QuestionsBudget.tsx";
import fetchWithAuth from "./components/FetchUrlAuth.tsx";

export default function NewProject() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [profilData, setProfilData] = useState<string>("");
    const [logementData, setLogementData] = useState<FormData1>();
    const [budgetData, setBudgetData] = useState<FormData2>();

    const handleNext = () => {
        if (currentPage < 2) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleSubmit = async () => {
        console.log(name, description, profilData, logementData, budgetData);
        if (!name || !description || !profilData || !logementData || !budgetData) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        if (!window.confirm("Êtes-vous sûr de vouloir soumettre le projet ?")) {
            return;
        }
        const payload = {
            name: name,
            description: description,
            profilData: profilData,
            logementData,
            budgetData,
        };

       try {
           const response = await fetchWithAuth("http://localhost:8000/api/projects/create", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify(payload),
           });

           if (!response.ok) {
               throw new Error(`Erreur HTTP : ${response.status}`);
           }

           const data = await response.json();
           console.log("Données envoyées avec succès :", data);
       } catch (error) {
           console.error("Erreur lors de l'envoi des données :", error);
       }
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
                                <CreationProfil onOptionChange={setProfilData} />
                            </div>
                            <div className="page">
                                <QuestionsLogement onChange={setLogementData} />
                            </div>
                            <div className="page">
                                <QuestionsBudget onChange={setBudgetData} />
                            </div>
                        </div>
                        <div className="carousel-controls">
                            <button onClick={handlePrevious} disabled={currentPage === 0}>
                                Précédent
                            </button>
                            {currentPage === 2 ? (
                                <button onClick={handleSubmit}>Envoyer</button>
                            ) : (
                                <button onClick={handleNext}>Suivant</button>
                            )}
                        </div>
                    </section>
                </section>
            </section>
        </>
    );
}