package com.example.backend.model;

import jakarta.persistence.*; // Gracias a esto spring sabe que esto sera un modelo de base de datos (una estructura)
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity // "Le dice a SPRING = Esta clase es una tabla de base de datos"

// Esto lo ponemos de esta forma gracias a lombok, sin lombok tendriamos que
// Escribir manualmente los getters, setters, constructores...
// RESUMIDAMENTE LOMBOK = menos codigo repetitivo
@Getter // Genera getters automaticamente
@Setter // Genera setters automaticamente
@NoArgsConstructor // Constructor vacio
@AllArgsConstructor // Contructor con todos los campos

public class Usuario {

    @Id // Indica que es PRIMARY KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY) // GENERA EL ID DE FORMA INCREMENTAL
    private Long id;

    @NotBlank // el campo no puede estar vacio
    private String nombre;

    @Email // Que tenga formato de email válido
    @NotBlank // el campo no puede estar vacio
    private String email;

}

/*
 * TENEMOS POR MISIÓN HACER ESTO:
 * 
 * GET /api/usuarios
 * GET /api/usuarios/{id}
 * POST /api/usuarios
 * PUT /api/usuarios/{id}
 * DELETE /api/usuarios/{id}
 */