import { useEffect, useState } from "react";
import fetchWithAuth from "./components/FetchUrlAuth";

export default function Admin() {
    // État pour stocker les fichiers de pondération originaux
    const [files, setFiles] = useState([]);
    // État pour stocker le contenu éditable (format string JSON) de chaque fichier
    const [editedContent, setEditedContent] = useState({});
    // État pour gérer le statut de sauvegarde de chaque fichier (ex: "saving", "saved", "error")
    const [savingStatus, setSavingStatus] = useState({});
    // État pour stocker les erreurs de parsing JSON lors de l'édition
    const [parseErrors, setParseErrors] = useState({});
    // État de chargement initial des fichiers
    const [isLoading, setIsLoading] = useState(true);
    // État d'erreur lors du chargement initial des fichiers
    const [fetchError, setFetchError] = useState(null);

    // Effet pour récupérer les fichiers lors du montage du composant
    useEffect(() => {
        const fetchFiles = async () => {
            setIsLoading(true);
            setFetchError(null);
            try {
                const response = await fetchWithAuth("http://localhost:8000/api/admin/weighting");
                if (response.ok) {
                    const data = await response.json();
                    setFiles(data);

                    // Initialise editedContent avec le contenu stringifié de chaque fichier
                    const initialEditedContent = {};
                    data.forEach(file => {
                        // Assurez-vous que file.content est un objet avant de stringifier
                        initialEditedContent[file.filename] = JSON.stringify(file.content, null, 2);
                    });
                    setEditedContent(initialEditedContent);
                } else {
                    const errorText = await response.text(); // Tente de lire le message d'erreur du backend
                    console.error("Erreur lors de la récupération des fichiers de pondération:", response.status, errorText);
                    setFetchError(`Échec du chargement des fichiers : ${response.status} - ${errorText}`);
                }
            } catch (error) {
                console.error("Erreur réseau ou autre:", error);
                setFetchError(`Erreur de connexion : ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFiles();
    }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une fois au montage

    // Gère les changements dans le textarea pour un fichier donné
    const handleContentChange = (filename, value) => {
        setEditedContent(prev => ({
            ...prev,
            [filename]: value
        }));

        // Tente de parser le JSON pour détecter les erreurs en temps réel
        try {
            JSON.parse(value);
            setParseErrors(prev => ({ ...prev, [filename]: null })); // Supprime l'erreur si le JSON est valide
        } catch (e) {
            setParseErrors(prev => ({ ...prev, [filename]: "JSON invalide : " + e.message }));
        }
    };

    // Gère la sauvegarde des modifications pour un fichier donné
    const handleSaveChanges = async (file) => {
        setSavingStatus(prev => ({ ...prev, [file.filename]: "saving" }));
        setParseErrors(prev => ({ ...prev, [file.filename]: null })); // Efface les erreurs précédentes

        try {
            // Vérifie d'abord si le JSON est valide avant d'envoyer
            const parsedContent = JSON.parse(editedContent[file.filename]);

            // Assumons un endpoint PUT pour mettre à jour un fichier spécifique
            // ex: PUT http://localhost:8000/api/admin/weighting/desires.json
            const response = await fetchWithAuth(`http://localhost:8000/api/admin/weighting/${file.filename}`, {
                method: 'PUT', // Ou 'PATCH' selon votre API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedContent),
            });

            if (response.ok) {
                setSavingStatus(prev => ({ ...prev, [file.filename]: "saved" }));
                // Met à jour l'état original 'files' avec le nouveau contenu pour garder la synchro
                setFiles(prevFiles =>
                    prevFiles.map(f =>
                        f.filename === file.filename ? { ...f, content: parsedContent } : f
                    )
                );
                // Efface le statut "saved" après quelques secondes
                setTimeout(() => setSavingStatus(prev => ({ ...prev, [file.filename]: null })), 3000);
            } else {
                const errorData = await response.json(); // Tente de lire le corps de l'erreur
                throw new Error(errorData.message || `Échec de la sauvegarde: ${response.status}`);
            }
        } catch (error) {
            console.error("Erreur lors de la sauvegarde :", error);
            setSavingStatus(prev => ({ ...prev, [file.filename]: "error" }));
            setParseErrors(prev => ({
                ...prev,
                [file.filename]: error.message || "Erreur inconnue lors de la sauvegarde."
            }));
            setTimeout(() => setSavingStatus(prev => ({ ...prev, [file.filename]: null })), 5000); // Efface l'erreur après 5s
        }
    };

    return (
        <section id="admin-dashboard">
            <h1>Interface Administrateur</h1>
            <h2>Fichiers de pondération</h2>

            {isLoading && <p className="loading-message">Chargement des fichiers...</p>}
            {fetchError && <p className="error-message">{fetchError}</p>}

            {!isLoading && !fetchError && (
                <ul>
                    {files.length === 0 && <p>Aucun fichier de pondération trouvé.</p>}
                    {files.map((file, index) => (
                        <li key={index}>
                            <strong>{file.filename}</strong>
                            {/* Textarea pour l'édition du JSON */}
                            <textarea
                                value={editedContent[file.filename] || ''}
                                onChange={(e) => handleContentChange(file.filename, e.target.value)}
                                rows="15" // Nombre de lignes par défaut
                            >
                            </textarea>

                            {/* Affichage des erreurs de parsing JSON */}
                            {parseErrors[file.filename] && (
                                <p className="error-message parse-error">{parseErrors[file.filename]}</p>
                            )}

                            <div className="action-row">
                                <button
                                    onClick={() => handleSaveChanges(file)}
                                    // Désactive le bouton si en cours de sauvegarde ou si le JSON est invalide
                                    disabled={savingStatus[file.filename] === "saving" || parseErrors[file.filename]}
                                >
                                    {savingStatus[file.filename] === "saving" ? "Sauvegarde..." : "Sauvegarder les modifications"}
                                </button>
                                {/* Affichage du statut de sauvegarde */}
                                {savingStatus[file.filename] === "saved" && (
                                    <span className="save-status save-success">✅ Sauvegardé !</span>
                                )}
                                {savingStatus[file.filename] === "error" && (
                                    <span className="save-status save-error">❌ Erreur lors de la sauvegarde.</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}