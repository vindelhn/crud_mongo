package com.demo.backend_mongo.service;

import com.demo.backend_mongo.model.Paciente;
import com.demo.backend_mongo.model.Sintoma;
import com.demo.backend_mongo.repository.PacienteReposistory;
import com.demo.backend_mongo.repository.SintomaReposistory;
import com.demo.backend_mongo.request.NuevoPaciente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacientesService {

    @Autowired
    private PacienteReposistory pacienteReposistory;

    public ResponseEntity<Object> createPaciente(NuevoPaciente paciente) {
        try {

            Paciente last = pacienteReposistory.findTopByOrderByIdDesc();

            Paciente newPaciente = new Paciente();
            newPaciente.setId( last != null ? last.getId() + 1 : 1 );
            newPaciente.setNombre(paciente.getNombre());
            newPaciente.setApellido(paciente.getApellido());
            newPaciente.setFechaNacimiento(paciente.getFechaNacimiento());
            newPaciente.setTelefonos(paciente.getTelefonos());
            newPaciente.setEmails(paciente.getEmails());

            pacienteReposistory.save(newPaciente);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updatePaciente(Paciente dto) {
        try {
            Long id = dto.getId();
            Paciente paciente = pacienteReposistory.findById( id ).orElseThrow(() -> new IllegalStateException(
                            "record with id "+id+" does not exist"
                    )
            );
            paciente.setNombre(dto.getNombre());
            paciente.setApellido(dto.getApellido());
            paciente.setFechaNacimiento(dto.getFechaNacimiento());
            paciente.setTelefonos(dto.getTelefonos());
            paciente.setEmails(dto.getEmails());

            pacienteReposistory.save(paciente);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> borrarPaciente(Long pacienteId){
        try {

            pacienteReposistory.deleteById(pacienteId);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> encotrarPacientes() {
        try {
            List<Paciente> result = null;
            result =  pacienteReposistory.findAll();

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
