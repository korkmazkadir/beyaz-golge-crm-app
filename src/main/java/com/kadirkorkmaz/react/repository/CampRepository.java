
package com.kadirkorkmaz.react.repository;

import com.kadirkorkmaz.react.entity.Camp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "camp", path = "camp")
public interface CampRepository extends JpaRepository<Camp, Long> {
    
}
