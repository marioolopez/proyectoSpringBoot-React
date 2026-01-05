const url = "http://localhost:8080/api/usuarios"; //conexion con el backend desde el frontend (esto apunta directamente en el controller en esta parte "@RequestMapping("/api/usuarios")")

export const obtenerUsuarios = async () => {
  const res = await fetch(url);
  return res.json();
};

export const crearUsuario = async (usuario) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });
  return res.json();
};

export const modificarUsuario = async (id, usuario) => {
  const res = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario)
  });
  return res.json();
};

export const borrarUsuario = async (id) => {
  await fetch(`${url}/${id}`, { method: "DELETE" });
};