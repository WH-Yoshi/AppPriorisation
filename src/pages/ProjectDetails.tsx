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

    const confirmDelete = () => {
        setOpen(true);
    };

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
        Type: string;
        Description: string;
        Score: number;
        Prime: number;
        "Estimated Cost": number;
        "Estimated Grant": number;
        "Cost by surface?": boolean;
        "Grant by surface?": boolean;
      }>;

      const worksByType = travaux.reduce((acc, travail) => {
        if (!acc[travail.Type]) {
          acc[travail.Type] = [];
        }
        acc[travail.Type].push(travail);
        return acc;
      }, {} as Record<string, typeof travaux>);

      return (
        <section className="travaux-container">
          {Object.entries(worksByType).map(([type, workType]) => (
            <section key={type} className="categorie">
              <h3>{type}</h3>
              <section className="travaux-list">
                {workType.map((travail, index) => (
                  <article key={index} className="travail-card">
                    <h4>{travail.Description}</h4>
                    <article className="details">
                      <p>Score de priorité : <span>{formatScore(travail.Score)}</span></p>
                      <p>Coût moyen estimé : <span>{formatMontant(travail["Estimated Cost"])}{travail["Cost by surface?"] ? "/m²" : ""}</span></p>
                      <p>Prime éligible estimée: <span>{formatMontant(travail["Estimated Grant"])}</span></p>
                    </article>
                  </article>
                ))}
              </section>
            </section>
          ))}
        </section>
      );
    };

    const performDelete = async () => {
        try {
            const response = await fetchWithAuth(`https://apppriorisation-api-production.up.railway.app/api/projects/${id}`, {
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
            const response = await fetchWithAuth(`https://apppriorisation-api-production.up.railway.app/api/projects/${id}`, {
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
        <section id="project-details">
            <article className="title">
                <h1>Détails du projet</h1>
            </article>
            <section className="content">
                <DisplayRenovationWorks />
            </section>
            <section className="actions">
                <button onClick={() => window.location.href = `/projects/${id}/edit`}>Modifier</button>
                <button onClick={confirmDelete}>Supprimer</button>
            </section>
            <section className="retour">
                <button onClick={() => window.location.href = "/dashboard"}>Retour</button>
            </section>
            {open && (
                <div className="delete-confirmation">
                    <p>Êtes-vous sûr de vouloir supprimer ce projet ?</p>
                    <article>
                        <button onClick={performDelete}>Confirmer</button>
                        <button onClick={() => setOpen(false)}>Annuler</button>
                    </article>
                </div>
            )}
        </section>
    );
}