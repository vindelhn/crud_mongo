package com.demo.backend_mongo.repository;

import com.demo.backend_mongo.model.Sintoma;
import com.demo.backend_mongo.model.SintomaPaciente;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SintomasPacientesReposistory extends MongoRepository<SintomaPaciente, Long> {

    List<SintomaPaciente> findAllByPacienteId(Long id);

    SintomaPaciente findTopByOrderByIdDesc();

}
