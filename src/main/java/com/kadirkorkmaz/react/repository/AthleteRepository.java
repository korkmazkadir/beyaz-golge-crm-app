
package com.kadirkorkmaz.react.repository;

import com.kadirkorkmaz.react.entity.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "athlete", path = "athlete")
public interface AthleteRepository extends JpaRepository<Athlete, Long> {
    
    public Athlete findOneByAthleteInfoIdNumber(@Param("idNumber") String idNumber);
    
}
