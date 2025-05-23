const API_URL = "http://localhost:8000";

type FetchOptions = {
    headers?: Record<string, string>;
    [key: string]: any;
};

export default async function fetchWithAuth(url: string, options: FetchOptions = {}) {
    const token = sessionStorage.getItem("token");

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    let response = await fetch(`${url}`, options);

    if (response.status === 401) {
        const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (refreshResponse.ok) {
            const { access_token } = await refreshResponse.json();
            sessionStorage.setItem("token", access_token);

            options.headers.Authorization = `Bearer ${access_token}`;
            response = await fetch(`${url}`, options);
        } else if (refreshResponse.status === 401) {
            sessionStorage.removeItem("token");
            throw new Error("Session expirée. Veuillez vous reconnecter.");
        } else if (refreshResponse.status === 404) {
            sessionStorage.removeItem("token");
            throw new Error("Erreur lors du rafraîchissement du token.");
        }
    } else if (response.status === 404) {
        sessionStorage.removeItem("token");
    }

    return response;
}