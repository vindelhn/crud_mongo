package com.demo.backend_mongo.repository;

import com.demo.backend_mongo.model.Paciente;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PacienteReposistory extends MongoRepository<Paciente, Long> {

    Paciente findTopByOrderByIdDesc();

}
