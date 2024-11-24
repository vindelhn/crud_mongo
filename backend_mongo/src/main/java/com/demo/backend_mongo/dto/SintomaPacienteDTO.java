package com.demo.backend_mongo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SintomaPacienteDTO {

    private Long id;


    private String nombrePaciente;
    private String apellidoPaciente;
    private String nombreSintoma;

    public SintomaPacienteDTO(Long id, String nombrePaciente, String apellidoPaciente, String nombreSintoma) {
        this.id = id;
        this.nombrePaciente = nombrePaciente;
        this.apellidoPaciente = apellidoPaciente;
        this.nombreSintoma = nombreSintoma;
    }
}
