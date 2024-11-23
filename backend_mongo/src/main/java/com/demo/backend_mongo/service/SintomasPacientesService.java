package com.demo.backend_mongo.service;

import com.demo.backend_mongo.model.Paciente;
import com.demo.backend_mongo.model.Sintoma;
import com.demo.backend_mongo.model.SintomaPaciente;
import com.demo.backend_mongo.repository.SintomasPacientesReposistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SintomasPacientesService {

    @Autowired
    private SintomasPacientesReposistory sintomasPacientesReposistory;

    public ResponseEntity<Object> createSintomaPaciente(SintomaPaciente sintomaPaciente) {
        try {
            sintomasPacientesReposistory.save(sintomaPaciente);
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
