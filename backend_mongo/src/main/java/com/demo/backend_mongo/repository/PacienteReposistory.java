package com.demo.backend_mongo.repository;

import com.demo.backend_mongo.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteReposistory extends JpaRepository<Paciente, Long> {

}
