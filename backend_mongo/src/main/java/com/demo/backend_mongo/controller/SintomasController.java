package com.demo.backend_mongo.controller;

import com.demo.backend_mongo.model.Paciente;
import com.demo.backend_mongo.model.Sintoma;
import com.demo.backend_mongo.repository.SintomaReposistory;
import com.demo.backend_mongo.service.PacientesService;
import com.demo.backend_mongo.service.SintomasService;
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
@RequestMapping("api/v1/sintomas")
public class SintomasController {

    private final SintomasService sintomasService;

    public SintomasController(SintomasService sintomasService) {
        this.sintomasService = sintomasService;
    }

    @PostMapping("/sintoma")
    public ResponseEntity<Object> addSintoma(@RequestBody Sintoma sintoma) {
      return sintomasService.createSintoma(sintoma);
    }

    @PutMapping("/sintoma")
    public ResponseEntity<Object> updSintoma(@RequestBody Sintoma sintoma) {
        return sintomasService.updateSintoma(sintoma);
    }

    @DeleteMapping("/sintoma/{sintomaId}")
    public ResponseEntity<Object> borrarSintoma(@PathVariable Long sintomaId) {
        return sintomasService.borrarSintoma(sintomaId);
    }

    @GetMapping ("/todos")
    public ResponseEntity<Object> getSintomas() {
        return sintomasService.encotrarSintomas();
    }


}
