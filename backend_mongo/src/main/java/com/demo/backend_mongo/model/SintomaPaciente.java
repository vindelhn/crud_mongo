package com.demo.backend_mongo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("sintomas_pacientes")
@Getter
@Setter
public class SintomaPaciente {

    @Id
    private Long id;
    private Long pacienteId;
    private Long sintomaId;

}
