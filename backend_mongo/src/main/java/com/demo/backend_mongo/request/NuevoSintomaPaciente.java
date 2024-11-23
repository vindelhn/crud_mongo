package com.demo.backend_mongo.request;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class NuevoSintomaPaciente {

    private Long pacienteId;
    private Long sintomaId;

}
