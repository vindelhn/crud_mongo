package com.demo.backend_mongo.repository;

import com.demo.backend_mongo.model.Paciente;
import com.demo.backend_mongo.model.Sintoma;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SintomaReposistory extends MongoRepository<Sintoma, Long> {

}
