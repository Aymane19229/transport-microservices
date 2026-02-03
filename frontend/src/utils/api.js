// src/utils/api.js
const API_BASE_URL = "http://localhost:8080/api";

export const apiCall = async (endpoint, method = 'GET', body = null) => {
    const token = localStorage.getItem('token');
    
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        // Si le token est périmé (401), on déconnecte l'utilisateur proprement
        if (response.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
            throw new Error("Session expirée");
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Erreur serveur");
        }

        // On gère le cas où la réponse est du texte ou du JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return await response.text();

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};