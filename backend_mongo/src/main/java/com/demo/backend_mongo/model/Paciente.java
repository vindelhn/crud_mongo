package com.demo.backend_mongo.model;




import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document("paciente")
@Getter
@Setter
public class Paciente {

     @Id
     private Long id;
     private String nombre;
     private String apellido;
     private Date fechaNacimiento;
     private List<Telefono> telefonos;
     private List<Email> emails;



}
