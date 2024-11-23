package com.demo.backend_mongo.controller;

import com.demo.backend_mongo.model.Paciente;
import com.demo.backend_mongo.service.PacientesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/pacientes")
public class PacientesController {

    private final PacientesService pacientesService;

    public PacientesController(PacientesService pacientesService) {
        this.pacientesService = pacientesService;
    }

    @PostMapping("/paciente")
    public ResponseEntity<Object> addPaciente(@RequestBody Paciente paciente) {
      return pacientesService.createPaciente(paciente);
    }

    @PutMapping("/paciente")
    public ResponseEntity<Object> updPaciente(@RequestBody Paciente paciente) {
        return pacientesService.updatePaciente(paciente);
    }

    @DeleteMapping("/paciente/{pacienteId}")
    public ResponseEntity<Object> borrarPaciente(@PathVariable Long pacienteId) {
        return pacientesService.borrarPaciente(pacienteId);
    }

    @GetMapping ("/todos")
    public ResponseEntity<Object> getPacientes() {
        return pacientesService.encotrarPacientes();
    }


}
