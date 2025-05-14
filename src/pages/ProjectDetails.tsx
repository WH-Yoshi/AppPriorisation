import { useParams } from "react-router";
import {useState} from "react";
import fetchWithAuth from "./components/FetchUrlAuth.tsx";

export default function ProjetDetails() {
    const { id } = useParams();
    const [open, setOpen] = useState(false);

    const confirmDelete = () => {
        setOpen(true);
    };

    const performDelete = async () => {
        try {
            await fetchWithAuth(`http://localhost:8000/projects/${id}`, { method: "DELETE" });
            alert("Projet supprimé avec succès !");
            setOpen(false);
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    return (
        <div>
            <h1>Détails du projet</h1>
            <p>ID du projet : {id}</p>
            {/* Ajoutez ici la logique pour récupérer et afficher les détails du projet */}
        </div>
    );
}