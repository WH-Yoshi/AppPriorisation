import fetchWithAuth from "./FetchUrlAuth.tsx";

export async function CheckIsAdmin() {
    const response = await fetchWithAuth("https://apppriorisation-api-production.up.railway.app/api/auth/check-admin", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Unable to authenticate");
    }
    const data = await response.json();
    return data.is_admin || false;
}