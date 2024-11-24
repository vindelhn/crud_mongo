package com.demo.backend_mongo.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("sintomas")
@Getter
@Setter
public class Sintoma {

    @Id
    private Long id;
    private String nombre;
    private String descripcion;

}
