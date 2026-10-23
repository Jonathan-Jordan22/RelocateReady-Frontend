export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TOKEN_KEY = "token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("userId"); // clean up the old, pre-JWT value
}

// fetch() for protected endpoints: adds the token, and logs the user
// out if the server says the token is missing, invalid, or expired.
export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = new Headers(options.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (res.status === 401 && token) {
    clearToken();
    window.location.href = "/login";
  }
  return res;
}