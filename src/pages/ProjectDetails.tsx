import { useParams } from "react-router";
import { useEffect, useState } from "react";
import fetchWithAuth from "./components/FetchUrlAuth.tsx";

type Project = {
    id: number;
    name: string;
    description: string;
    details: any;
}

export default function ProjetDetails() {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState<Project | null>(null);

    /*const confirmDelete = () => {
        setOpen(true);
    };*/

    const DisplayRenovationWorks = () => {
      const formatMontant = (montant: number) => {
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0
        }).format(montant);
      };

      const formatScore = (score: number) => {
        return `${(score * 100).toFixed(1)}%`;
      };

      if (!project?.details) {
        return <div>Aucune donnée disponible</div>;
      }

      const travaux = project.details as Array<{
        Genre: string;
        Description: string;
        Score: number;
        Prime: number;
        "Coût estimé": number;    // Changé pour correspondre aux données
        "Prime Éligible": number; // Changé pour correspondre aux données
        "Coût par surface": boolean; // Changé pour correspondre aux données
        "Prime par surface": boolean;
      }>;

      const travauxParGenre = travaux.reduce((acc, travail) => {
        if (!acc[travail.Genre]) {
          acc[travail.Genre] = [];
        }
        acc[travail.Genre].push(travail);
        return acc;
      }, {} as Record<string, typeof travaux>);

      return (
        <div className="travaux-container">
          {Object.entries(travauxParGenre).map(([genre, travauxGenre]) => (
            <div key={genre} className="categorie">
              <h3>{genre}</h3>
              <div className="travaux-list">
                {travauxGenre.map((travail, index) => (
                  <div key={index} className="travail-card">
                    <h4>{travail.Description}</h4>
                    <div className="details">
                      <p>Score de priorité : <span>{formatScore(travail.Score)}</span></p>
                      <p>Coût moyen estimé : <span>{formatMontant(travail["Coût estimé"])}{travail["Coût par surface"] ? "/m²" : ""}</span></p>
                      <p>Prime éligible estimée: <span>{formatMontant(travail["Prime Éligible"])}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    };

    const performDelete = async () => {
        try {
            const response = await fetchWithAuth(`http://localhost:8000/api/projects/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert("Projet supprimé avec succès.");
            window.location.href = "/projects";
        } catch (error) {
            alert(`Projet ${error}`);
        }
    }

    const fetchProjects = async () => {
        try {
            const response = await fetchWithAuth(`http://localhost:8000/api/projects/${id}`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const formattedData: Project = {
                id: data.id,
                name: data.nom,
                description: data.description,
                details: data.details,
            };
            setProject(formattedData);
        } catch (error) {
            console.error("Erreur :", error);
            alert("Erreur lors de la récupération du projet.");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    if (!project) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1>Détails du projet</h1>
            <DisplayRenovationWorks />

            {open && (
                <div>
                    <p>Êtes-vous sûr de vouloir supprimer ce projet ?</p>
                    <button onClick={performDelete}>Confirmer</button>
                    <button onClick={() => setOpen(false)}>Annuler</button>
                </div>
            )}
        </div>
    );
}