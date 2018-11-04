package com.kadirkorkmaz.react.repository;

import com.kadirkorkmaz.react.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "registration", path = "registration")
public interface RegistrationRepository extends JpaRepository<Registration, Long> {

}
