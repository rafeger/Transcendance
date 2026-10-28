const API_URL = "/api";

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        ...options, credentials: "include", headers: {
            "Content-Type": "application/json", ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Error API: ${response.status}`);
    }
    return response.json() as Promise<T>;
}