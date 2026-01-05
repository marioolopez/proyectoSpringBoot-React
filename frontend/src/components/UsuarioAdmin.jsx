import { useEffect, useState } from "react"
import { crearUsuario, obtenerUsuarios, modificarUsuario, borrarUsuario } from "../api/usuariosApi"

const UsuarioAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // 🔹 Cargar usuarios al iniciar
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await obtenerUsuarios();
    setUsuarios(data);
  };

  // 🔹 Crear o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = { nombre, email };

    if (editandoId) {
      await modificarUsuario(editandoId, usuario);
      setEditandoId(null);
    } else {
      await crearUsuario(usuario);
    }

    setNombre("");
    setEmail("");
    cargarUsuarios();
  };

  // 🔹 Preparar edición
  const editarUsuario = (usuario) => {
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setEditandoId(usuario.id);
  };

  // 🔹 Eliminar
  const eliminarUsuario = async (id) => {
    await borrarUsuario(id);
    cargarUsuarios();
  };

  return (
    <div>
      <h2>Administrador de Usuarios</h2>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          {editandoId ? "Actualizar" : "Crear"}
        </button>
      </form>

      <hr />

      {/* LISTA */}
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.nombre} - {u.email}
            <button onClick={() => editarUsuario(u)}>Editar</button>
            <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsuarioAdmin;