const BASE = "https://pseudomonastical-interestedly-cristy.ngrok-free.dev/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  members: {
    list: (search) => request(`/members${search ? `?search=${encodeURIComponent(search)}` : ""}`),
    create: (payload) => request("/members", { method: "POST", body: JSON.stringify(payload) }),
    update: (id, payload) => request(`/members/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
    remove: (id) => request(`/members/${id}`, { method: "DELETE" }),
    checkIn: (id) => request(`/members/${id}/checkin`, { method: "POST" }),
    renew: (id, months) => request(`/members/${id}/renew`, { method: "POST", body: JSON.stringify({ months }) }),
  },
  trainers: {
    list: (search) => request(`/trainers${search ? `?search=${encodeURIComponent(search)}` : ""}`),
    create: (payload) => request("/trainers", { method: "POST", body: JSON.stringify(payload) }),
    update: (id, payload) => request(`/trainers/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
    remove: (id) => request(`/trainers/${id}`, { method: "DELETE" }),
  },
  statistics: () => request("/statistics"),
  analytics: () => request("/analytics"),
  expiringSoon: (days = 7) => request(`/expiring-soon?days=${days}`),
};
