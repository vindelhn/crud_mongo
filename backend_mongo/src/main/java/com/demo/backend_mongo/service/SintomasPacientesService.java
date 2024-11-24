package com.demo.backend_mongo.service;


import com.demo.backend_mongo.dto.SintomaPacienteDTO;
import com.demo.backend_mongo.model.Paciente;
import com.demo.backend_mongo.model.Sintoma;
import com.demo.backend_mongo.model.SintomaPaciente;
import com.demo.backend_mongo.repository.SintomasPacientesReposistory;

import com.demo.backend_mongo.request.NuevoSintomaPaciente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SintomasPacientesService {

    @Autowired
    private SintomasPacientesReposistory sintomasPacientesReposistory;

    @Autowired
    private MongoTemplate mongoTemplate;


    public List<SintomaPacienteDTO> obtenerSintomasPorPaciente() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.lookup("pacientes", "pacienteId", "_id", "paciente"), // Une síntomas con pacientes
                Aggregation.unwind("paciente"), // Descompone la lista de pacientes
                Aggregation.lookup("sintomas", "sintomaId", "_id", "sintoma"), // Une síntomas con la colección sintomas
                Aggregation.unwind("sintoma"), // Descompone la lista de síntomas
                Aggregation.project() // Proyecta los campos deseados
                        .and("id.nombre").as("id")
                        .and("paciente.nombre").as("nombrePaciente") // Renombramos el campo de paciente
                        .and("paciente.apellido").as("apellidoPaciente")
                        .and("sintoma.nombre").as("nombreSintoma") // Renombramos el campo de síntoma
        );

        AggregationResults<SintomaPacienteDTO> results = mongoTemplate.aggregate(aggregation, "sintomas_pacientes", SintomaPacienteDTO.class);
        return results.getMappedResults();
    }

    public ResponseEntity<Object> createSintomaPaciente(NuevoSintomaPaciente sintomaPaciente) {
        try {
            SintomaPaciente last = sintomasPacientesReposistory.findTopByOrderByIdDesc();
            SintomaPaciente newSintomaPaciente = new SintomaPaciente();
            newSintomaPaciente.setId(last != null ? last.getId() + 1 : 1);
            newSintomaPaciente.setPacienteId(sintomaPaciente.getPacienteId());
            newSintomaPaciente.setSintomaId(sintomaPaciente.getSintomaId());

            sintomasPacientesReposistory.save(newSintomaPaciente);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity<Object> borrarSintomaPaciente(Long sintomaId){
        try {

            sintomasPacientesReposistory.deleteById(sintomaId);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> encotrarSintomasPaciente(Long pacienteId) {
        try {
            List<SintomaPaciente> result = null;
            result =  sintomasPacientesReposistory.findAllByPacienteId(pacienteId);

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
