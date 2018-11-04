/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kadirkorkmaz.react.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.Data;


@Embeddable
@Data
public class AthleteInfo {
    
    @Column(name = "tc_id_number", length = 11)
    private String idNumber;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "surname", length = 50)
    private String surname;

    @Column(name = "gender", length = 10)
    private String gender;
    
    @Column(name = "birth_date")
    private Date birthDate;
    
    @Column(name = "mobile_phone", length = 25)
    private String mobilePhone;

    @Column(name = "email_address", length = 50)
    private String email;

    @Column(name = "bloodType", length = 10)
    private String bloodType ;
    
    @Column(name = "city", length = 50)
    private String city;
    
    @Column(name = "school", length = 100)
    private String school;
    
    @Column(name = "club", length = 100)
    private String club;
    
    @Column(name = "agency", length = 100)
    private String agency;
    
    @Column(name = "size", length = 5)
    private String size;
    
    @Column(name = "jersey_number", length = 5)
    private String jerseyNumber;

    public AthleteInfo() {
    }

    public AthleteInfo(String idNumber, String name, String surname, String gender, Date birthDate, String phoneNumber, String email, String bloodType, String city, String school, String club, String agency, String size, String jerseyNumber) {
        this.idNumber = idNumber;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthDate = birthDate;
        this.mobilePhone = phoneNumber;
        this.email = email;
        this.bloodType = bloodType;
        this.city = city;
        this.school = school;
        this.club = club;
        this.agency = agency;
        this.size = size;
        this.jerseyNumber = jerseyNumber;
    }
    
}
