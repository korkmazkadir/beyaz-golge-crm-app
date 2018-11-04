package com.kadirkorkmaz.react.entity;

import java.sql.Date;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "camp")
@Data
public class Camp {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "place", length = 100)
    private String place;

    @Column(name = "start_date", length = 100)
    private Date startDate;

    @Column(name = "end_date", length = 100)
    private Date endDate;

    @OneToMany(
            mappedBy = "camp",
            cascade = CascadeType.ALL
    )
    private List<Registration> registrations = new LinkedList<>();

    protected Camp() {
    }

    public Camp(String name, String place, Date startDate, Date endDate) {
        this.name = name;
        this.place = place;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Camp(Long id, String name, String place, Date startDate, Date endDate) {
        this.id = id;
        this.name = name;
        this.place = place;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public void addRegistration(Registration registration) {
        registrations.add(registration);
        registration.setCamp(this);
    }

    public void removeRegistration(Registration registration) {
        registrations.remove(registration);
        registration.setCamp(null);
    }

    //Document : https://reflectoring.io/relations-with-spring-data-rest/
    @PrePersist
    @PreUpdate
    public void updateRegistrationAssociation(){
      for(Registration registration : this.registrations){
        registration.setCamp(this);
      }
    }
    
}

