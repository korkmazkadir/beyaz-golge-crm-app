
package com.kadirkorkmaz.react.repository;

import com.kadirkorkmaz.react.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "payment", path = "payment")
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
}
