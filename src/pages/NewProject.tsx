import {useState} from "react";
import QuestionsProfile from "./QuestionsProfile.tsx";
import QuestionsHousing, {FormData1} from "./QuestionsHousing.tsx";
import QuestionsBudget, {FormData2} from "./QuestionsBudget.tsx";
import fetchWithAuth from "./components/FetchUrlAuth.tsx";
import QuestionsTechnical, {FormData3} from "./QuestionsTechnical.tsx";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

type NewProjectProps = {
    onProjectCreated: () => void;
}

export default function NewProject({ onProjectCreated }: NewProjectProps) {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [profilData, setProfilData] = useState<string>("");
    const [housingData, setHousingData] = useState<FormData1>();
    const [budgetData, setBudgetData] = useState<FormData2>();
    const [technicalData, setTechnicalData] = useState<FormData3>();
    const [region, setRegion] = useState<string>("");

    const handleNext = () => {
        if (currentPage < 3) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleSubmit = async () => {
        console.log(region)
        console.log(name, description, profilData, region, housingData, budgetData, technicalData);
        if (!name || !description || !profilData || !region || !housingData || !budgetData || !technicalData) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        if (!window.confirm("Êtes-vous sûr de vouloir soumettre le projet ?")) {
            return;
        }
        const payload = {
            name: name,
            description: description,
            profileData: profilData,
            region: region,
            housingData,
            budgetData,
            technicalData
        };

        console.log(payload);

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

           alert("Projet créé avec succès !");
           onProjectCreated();
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
                    <TextField
                        value={name}
                        label="Nom"
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        sx = {{ width: "400px" }}
                    />
                    <TextField
                        value={description}
                        label="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                    />
                    <FormControl fullWidth sx={{ width: "400px" }}>
                        <InputLabel>Votre Région</InputLabel>
                        <Select value={region} onChange={(e) => setRegion(e.target.value)} label="Votre Région">
                            <MenuItem value="wallonie">Wallonie</MenuItem>
                            <MenuItem value="flandre" disabled>Flandre (Bientôt)</MenuItem>
                            <MenuItem value="bruxelles" disabled>Bruxelles-Capitale (Bientôt)</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                        <section className="carousel">
                        <div className="carousel-container">
                            <div className={`page ${currentPage === 0 ? 'active' : ''}`}>
                                {currentPage === 0 && <QuestionsProfile onOptionChange={setProfilData} initialValue={profilData} />}
                            </div>
                            <div className={`page ${currentPage === 1 ? 'active' : ''}`}>
                                {currentPage === 1 && <QuestionsHousing onChange={setHousingData} initialData={housingData} />}
                            </div>
                            <div className={`page ${currentPage === 2 ? 'active' : ''}`}>
                                {currentPage === 2 && <QuestionsBudget onChange={setBudgetData} initialData={budgetData} />}
                            </div>
                            <div className={`page ${currentPage === 3 ? 'active' : ''}`}>
                                {currentPage === 3 && <QuestionsTechnical onChange={setTechnicalData} initialData={technicalData} />}
                            </div>
                        </div>
                        <div className="carousel-controls">
                            <button onClick={handlePrevious} disabled={currentPage === 0}>
                                Précédent
                            </button>
                            {currentPage === 3 ? (
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