package com.demo.backend_mongo.request;

import com.demo.backend_mongo.model.Email;
import com.demo.backend_mongo.model.Telefono;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
@Getter
@Setter
public class NuevoPaciente {

    private String nombre;
    private String apellido;
    private Date fechaNacimiento;
    private List<Telefono> telefonos;
    private List<Email> emails;

}
