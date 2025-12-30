import { useEffect, useState } from "react";
import { administradorService } from "../../services/administradorService";
import type { administrador } from "../../models/administrador";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";

function Administrador() {
  const [admins, setAdmins] = useState<administrador[]>([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const cargarAdmins = async () => {
    const data = await administradorService.getAll();
    setAdmins(data);
  };

  useEffect(() => { 
    cargarAdmins();
  }, []);
  

  const guardar = async () => {
    if (!nombre || !email) return;

    if (editId === null) {
      await administradorService.create({ nombre, email });
    } else {
      await administradorService.update(editId, { nombre, email });
      setEditId(null);
    }

    setNombre("");
    setEmail("");
    cargarAdmins();
  };

  const editar = (admin: administrador) => {
    setNombre(admin.nombre);
    setEmail(admin.email);
    setEditId(admin.id);
  };

  const eliminar = async (id: number) => {
    await administradorService.delete(id);
    cargarAdmins();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>CRUD Administradores</h2>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <Button variant="contained" color="primary" onClick={guardar}> {editId === null ? "Crear" : "Actualizar"} </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.nombre}</TableCell>
                <TableCell>{a.email}</TableCell>
                <TableCell>
                  <Button onClick={() => editar(a)} color="secondary">Editar</Button>
                  <Button onClick={() => eliminar(a.id)} color="error">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Administrador;
