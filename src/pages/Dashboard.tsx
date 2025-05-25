import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Modal, Box} from "@mui/material";
import NewProject from "./NewProject.tsx";
import closeIcon from "/assets/close.svg";
import fetchWithAuth from "./components/FetchUrlAuth.tsx";

type Project = {
    id: number;
    name: string;
    description: string;
    details: any;
}

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const navigate = useNavigate();
    const [NewOpen, setNewOpen] = useState(false);

    const handleOpen = () => setNewOpen(true);
    const handleClose = () => {
        if (window.confirm("Êtes-vous sûr de vouloir annuler ?\nVous perdrez toutes les modifications.")) {
            setNewOpen(false);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await fetchWithAuth("https://apppriorisation-api-production.up.railway.app/api/projects/retrieve", {
                method: "GET",
            });
            if (!response.ok) {
                console.log(response);
            }
            const data = await response.json();
            const formattedData: Project[] = data.map((item: { id: number; name: string; description: string; details: any }) => ({
                id: item.id,
                name: item.name,
                description: item.description,
            }));
            setProjects(formattedData);
        } catch (error) {
            console.error("Erreur lors de la récupération des logements :", error);
            alert("Erreur lors de la récupération des logements.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    function handleModification(id: number) {
        navigate(`/project/${id}`);
    }

    const confirmDelete = (id: number) => {
        setSelectedId(id);
        setNewOpen(true);
    };

    const performDelete = async () => {
        try {
            await fetchWithAuth(`https://apppriorisation-api-production.up.railway.app/api/projects/${selectedId}`, { method: "DELETE" });
            alert("Projet supprimé avec succès !");
            setNewOpen(false);
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    return (
        <>
            <section id="dashboard">
                <button onClick={fetchProjects} className="refresh">
                    Rafraichir
                </button>
                <article className="title">
                    <h1>Dashboard Rénovateur</h1>
                </article>
                <section className="content">
                    <>
                        <article className="top">
                            <h1>Vos logements</h1>
                            <button type="button" className="new-project" onClick={handleOpen}>
                                Ajoutez un logement
                            </button>
                        </article>
                        <hr />
                        <section className="projects">
                            {loading ? (
                                <p>Chargement des logement...</p>
                            ) : projects.length === 0 ? (
                                <p>Aucun logement pour le moment.</p>
                            ) : (
                                projects.map((project) => (
                                    <section key={project.id}>
                                        <article className="left">
                                            <h3>Titre : {project.name}</h3>
                                            <p>description : {project.description}</p>
                                        </article>
                                        <article className="right">
                                            <button onClick={() => handleModification(project.id)}>Modifier</button>
                                            <button onClick={() => confirmDelete(project.id)}>Supprimer</button>
                                        </article>
                                    </section>
                                ))
                            )}
                        </section>
                    </>
                </section>

                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogContent>
                        Êtes-vous sûr de vouloir supprimer ce logement ?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Annuler</Button>
                        <Button onClick={performDelete} color="error">Supprimer</Button>
                    </DialogActions>
                </Dialog>

                <Modal open={NewOpen} onClose={handleClose}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "background.paper",
                            borderRadius: 3,
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <div className="close-icon"><img alt="close" onClick={handleClose} src={closeIcon}/></div>
                        <NewProject
                            onProjectCreated={() => {
                                setNewOpen(false);
                                fetchProjects()
                            }}
                        />
                    </Box>
                </Modal>
            </section>
        </>
    );
}