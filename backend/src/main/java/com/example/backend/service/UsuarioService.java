package com.example.backend.service;

import com.example.backend.model.Usuario; //IMPORTAS EL MODELO DE USUARIOS (Atributos)
import com.example.backend.repository.UsuarioRepositorio; //IMPORTAS EL REPOSITORIO de USUARIOS
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List; //se usa cuando queremos DEVOLVER VARIOS usuarios ------- <Usuarios[]>
import java.util.Optional; //se usa cuando queremos DEVOLVER un UNICO usuario   -------  <Usuario>

@Service
public class UsuarioService { // CREAS LAS PETICIONES AL BACKEND

    @Autowired
    public UsuarioRepositorio usuarioRespositorio; // creas un atributo usuarioRespositorio

    // listar todos los usuarios
    public List<Usuario> listarUsuarios() {
        return usuarioRespositorio.findAll();
    }

    // obtener un usuario por ID
    public Usuario obtenerUsuario(Long id) {
        return usuarioRespositorio.findById(id).orElse(null);
    }

    // crear un nuevo usuario
    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRespositorio.save(usuario);
    }

    // elimina el usuario por ID
    public boolean eliminarUsuario(Long id) {
        if (usuarioRespositorio.existsById(id)) {
            usuarioRespositorio.deleteById(id);
            return true;
        }
        return false;
    }

    // actualizar usuario por ID
    public Usuario actualizarUsuario(Long id, Usuario usuario) {
        Optional<Usuario> usuarioExistente = usuarioRespositorio.findById(id); // obtenemos los datos de ese Usuario

        if (usuarioExistente.isPresent()) {
            Usuario u = usuarioExistente.get();

            u.setEmail(usuario.getEmail());
            u.setNombre(usuario.getNombre());
            return usuarioRespositorio.save(u);

        } else {
            return null; // si no hay usuario
        }

    }

}
