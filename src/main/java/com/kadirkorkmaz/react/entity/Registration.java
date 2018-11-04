package com.kadirkorkmaz.react.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "registration")
@Data
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "athlete_id")
    private Athlete athlete;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "camp_id")
    private Camp camp;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    @NotNull
    private RegistrationType registrationType;

    @Embedded
    PreRegistration preRegistration;
    
    @Embedded
    FinalRegistration finalRegistration;
    
    
    //I removed Cascade property, what is the cost of this
    @OneToMany(
            mappedBy = "registration",
            cascade = CascadeType.ALL
    )
    @JsonIgnoreProperties("registration")
    private List<Meeting> meetings = new LinkedList<>();

    
    @OneToMany(
            mappedBy = "registration",
            cascade = CascadeType.ALL
    )
    private List<Payment> payments = new LinkedList<>();

    
}
