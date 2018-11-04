package com.kadirkorkmaz.react.entity;

import java.util.LinkedList;
import java.util.List;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
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
@Table(name = "athlete")
@Data
public class Athlete {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
 
    @Embedded
    private AthleteInfo athleteInfo;
    
   
    @AttributeOverrides({
        @AttributeOverride(name = "relationship", column = @Column(name = "mother_relationship")),
        @AttributeOverride(name = "nameSurname", column = @Column(name = "mother_name_surname")),
        @AttributeOverride(name = "occupation", column = @Column(name = "mother_occupation")),
        @AttributeOverride(name = "phone", column = @Column(name = "mother_phone")),
        @AttributeOverride(name = "mobilePhone", column = @Column(name = "mother_mobil_phone")),
        @AttributeOverride(name = "workPhone", column = @Column(name = "mother_work_phone")),
        @AttributeOverride(name = "email", column = @Column(name = "mother_email")),
    })
    @Embedded
    private Contact motherInfo;
    
    
    @AttributeOverrides({
        @AttributeOverride(name = "relationship", column = @Column(name = "father_relationship")),
        @AttributeOverride(name = "nameSurname", column = @Column(name = "father_name_surname")),
        @AttributeOverride(name = "occupation", column = @Column(name = "father_occupation")),
        @AttributeOverride(name = "phone", column = @Column(name = "father_phone")),
        @AttributeOverride(name = "mobilePhone", column = @Column(name = "father_mobil_phone")),
        @AttributeOverride(name = "workPhone", column = @Column(name = "father_work_phone")),
        @AttributeOverride(name = "email", column = @Column(name = "father_email")),
    })
    @Embedded
    private Contact fatherInfo;
    
    
     @AttributeOverrides({
        @AttributeOverride(name = "relationship", column = @Column(name = "parent_relationship")),
        @AttributeOverride(name = "nameSurname", column = @Column(name = "parent_name_surname")),
        @AttributeOverride(name = "occupation", column = @Column(name = "parent_occupation")),
        @AttributeOverride(name = "phone", column = @Column(name = "parent_phone")),
        @AttributeOverride(name = "mobilePhone", column = @Column(name = "parent_mobil_phone")),
        @AttributeOverride(name = "workPhone", column = @Column(name = "parent_work_phone")),
        @AttributeOverride(name = "email", column = @Column(name = "parent_email")),
    })
    @Embedded
    private Contact parentInfo;
    
     
    @AttributeOverrides({
        @AttributeOverride(name = "relationship", column = @Column(name = "emergency_relationship")),
        @AttributeOverride(name = "nameSurname", column = @Column(name = "emergency_name_surname")),
        @AttributeOverride(name = "occupation", column = @Column(name = "emergency_occupation")),
        @AttributeOverride(name = "phone", column = @Column(name = "emergency_phone")),
        @AttributeOverride(name = "mobilePhone", column = @Column(name = "emergency_mobil_phone")),
        @AttributeOverride(name = "workPhone", column = @Column(name = "emergency_work_phone")),
        @AttributeOverride(name = "email", column = @Column(name = "emergency_email")),
    })
    @Embedded
    private Contact emergencyInfo;
    
    @OneToMany(
        mappedBy = "athlete", 
        cascade = CascadeType.ALL
    )
    private List<Registration> registrations = new LinkedList<>();

    
    public Athlete() {
    }

    public Athlete(Long id, AthleteInfo athleteInfo, Contact motherInfo, Contact fatherInfo, Contact parentInfo, Contact emergencyInfo) {
        this.id = id;
        this.athleteInfo = athleteInfo;
        this.motherInfo = motherInfo;
        this.fatherInfo = fatherInfo;
        this.parentInfo = parentInfo;
        this.emergencyInfo = emergencyInfo;
    }

    public Athlete(AthleteInfo athleteInfo, Contact motherInfo, Contact fatherInfo, Contact parentInfo, Contact emergencyInfo) {
        this.athleteInfo = athleteInfo;
        this.motherInfo = motherInfo;
        this.fatherInfo = fatherInfo;
        this.parentInfo = parentInfo;
        this.emergencyInfo = emergencyInfo;
    }

    public void addRegistration(Registration registration) {
        registrations.add(registration);
        registration.setAthlete(this);
    }
 
    public void removeRegistration(Registration registration) {
        registrations.remove(registration);
        registration.setAthlete(null);
    }

    //Document : https://reflectoring.io/relations-with-spring-data-rest/
    @PrePersist
    @PreUpdate
    public void updateRegistrationAssociation(){
      for(Registration registration : this.registrations){
        registration.setAthlete(this);
      }
    }
    
}
