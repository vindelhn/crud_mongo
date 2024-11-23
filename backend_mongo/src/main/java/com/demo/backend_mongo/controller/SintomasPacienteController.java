package com.demo.backend_mongo.controller;

import com.demo.backend_mongo.model.SintomaPaciente;
import com.demo.backend_mongo.request.NuevoSintomaPaciente;
import com.demo.backend_mongo.service.SintomasPacientesService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/sintomas/paciente")
public class SintomasPacienteController {

    private final SintomasPacientesService sintomasPacientesService;

    public SintomasPacienteController(SintomasPacientesService sintomasPacientesService) {
        this.sintomasPacientesService = sintomasPacientesService;
    }

    @PostMapping("/paciente/sintoma")
    public ResponseEntity<Object> addSintoma(@RequestBody NuevoSintomaPaciente sintoma) {
      return sintomasPacientesService.createSintomaPaciente(sintoma);
    }

    @DeleteMapping("paciente/sintoma/{sintomaId}")
    public ResponseEntity<Object> borrarSintoma(@PathVariable Long sintomaId) {
        return sintomasPacientesService.borrarSintomaPaciente(sintomaId);
    }

    @GetMapping ("paciente/sintomas/{pacienteId}")
    public ResponseEntity<Object> getSintomas(@PathVariable Long pacienteId) {
        return sintomasPacientesService.encotrarSintomasPaciente(pacienteId);
    }


}
