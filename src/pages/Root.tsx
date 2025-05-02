import { useState } from "react";
import {Outlet} from "react-router";

function Root() {
    const [data, setData] = useState<string | null>(null);

    const handleButtonClick = async () => {
        try {
            const response = await fetch("https://apppriorisation-api-production.up.railway.app/test-db");
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des données");
            }
            const result = await response.json();
            setData(JSON.stringify(result));
        } catch (error) {
            console.error(error);
            setData("Une erreur s'est produite");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Page Root</h1>
            <button onClick={handleButtonClick}>Appeler l'API</button>
            {data && <pre>{data}</pre>}
            <Outlet />
        </div>
    );
}

export default Root;