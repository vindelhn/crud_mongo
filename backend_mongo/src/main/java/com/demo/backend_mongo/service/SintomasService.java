package com.demo.backend_mongo.service;

import com.demo.backend_mongo.model.Paciente;
import com.demo.backend_mongo.model.Sintoma;
import com.demo.backend_mongo.repository.PacienteReposistory;
import com.demo.backend_mongo.repository.SintomaReposistory;
import com.demo.backend_mongo.request.NuevoSintoma;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SintomasService {

    @Autowired
    private SintomaReposistory sintomaReposistory;

    public ResponseEntity<Object> createSintoma(NuevoSintoma sintoma) {
        try {

            Sintoma last = sintomaReposistory.findTopByOrderByIdDesc();

            Sintoma newSintoma = new Sintoma();
            newSintoma.setId(last.getId() + 1);
            newSintoma.setNombre(sintoma.getNombre());
            newSintoma.setDescripcion(sintoma.getDescripcion());

            sintomaReposistory.save(newSintoma);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateSintoma(Sintoma dto) {
        try {
            Long id = dto.getId();
            Sintoma sintoma = sintomaReposistory.findById( id ).orElseThrow(() -> new IllegalStateException(
                            "record with id "+id+" does not exist"
                    )
            );
            sintoma.setNombre(dto.getNombre());
            sintoma.setDescripcion(dto.getDescripcion());



            sintomaReposistory.save(sintoma);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> borrarSintoma(Long sintomaId){
        try {

            sintomaReposistory.deleteById(sintomaId);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> encotrarSintomas() {
        try {
            List<Sintoma> result = null;
            result =  sintomaReposistory.findAll();

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
