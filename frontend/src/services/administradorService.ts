import type { administrador } from "../models/administrador";

const API_URL = "http://localhost:8080/api/usuarios";

export const administradorService = {
  getAll: async (): Promise<administrador[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return res.json();
  },

  create: async (admin: Omit<administrador, "id">): Promise<administrador> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admin),
    });
    if (!res.ok) throw new Error("Error al crear usuario");
    return res.json();
  },

  update: async (id: number, admin: Omit<administrador, "id">): Promise<administrador> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(admin),
    });
    if (!res.ok) throw new Error("Error al actualizar usuario");
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar usuario");
  },
};
