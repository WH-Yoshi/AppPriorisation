import { SetStateAction, useState} from "react";
import {
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions
} from "@mui/material";

export default function Dashboard() {
    const [projects, setProjects] = useState([
        {id: 1, name: "Projet Isolation", description: "Isolation thermique de la maison."},
        {id: 2, name: "Projet Solaire", description: "Installation de panneaux solaires."},
    ]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [newProject, setNewProject] = useState({name: "", description: ""});

    const handleProjectClick = (project: SetStateAction<null>) => {
    setSelectedProject(project);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewProject({ name: "", description: "" });
  };

  const handleCreateProject = () => {
    setProjects([...projects, { id: projects.length + 1, ...newProject }]);
    handleDialogClose();
  };

  return (
    <section id="dashboard">
      <Typography variant="h4" gutterBottom>
        Dashboard Rénovateur
      </Typography>
      <Button variant="contained" color="primary" onClick={handleDialogOpen}>
        Créer un nouveau projet
      </Button>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card onClick={() => handleProjectClick(project)} style={{ cursor: "pointer" }}>
              <CardContent>
                <Typography variant="h6">{project.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {project.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedProject && (
        <Dialog open={Boolean(selectedProject)} onClose={() => setSelectedProject(null)}>
          <DialogTitle>Détails du projet</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedProject.name}</Typography>
            <Typography variant="body1">{selectedProject.description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedProject(null)} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Créer un nouveau projet</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom du projet"
            fullWidth
            margin="normal"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleCreateProject} color="primary">
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}