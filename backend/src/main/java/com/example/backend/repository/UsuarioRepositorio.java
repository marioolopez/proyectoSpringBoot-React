package com.example.backend.repository;

import com.example.backend.model.Usuario; //le paso el modelo de Usuarios
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    // INTERFAZ (CLASE) QUE SE COMUNICA DIRECTAMENTE CON LA BASE DE DATOS

    // Permite realizar operaciones CRUD sin escribir SQL
    // Usa Spring Data JPA, que genera metodos como : save(), findAll(), findById(),
    // deleteById() y más...

    // El Repositorio permite leer y escribir en esa tabla

}
