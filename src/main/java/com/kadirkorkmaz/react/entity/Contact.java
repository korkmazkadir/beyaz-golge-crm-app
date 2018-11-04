
package com.kadirkorkmaz.react.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;


@Embeddable
public class Contact {
    
    @Column(length = 50)
    private String relationship;
    
    @Column(length = 50)
    private String nameSurname;
    
    @Column(length = 50)
    private String occupation;
   
    @Column(length = 25)
    private String phone;

    @Column(length = 25)
    private String mobilePhone;

    @Column(length = 25)
    private String workPhone;
    
    @Column(length = 50)
    private String email;

    public Contact() {
    }

    public Contact(String Relationship, String nameSurname, String occupation, String phone, String mobilePhone, String workPhone, String email) {
        this.relationship = Relationship;
        this.nameSurname = nameSurname;
        this.occupation = occupation;
        this.phone = phone;
        this.mobilePhone = mobilePhone;
        this.workPhone = workPhone;
        this.email = email;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String Relationship) {
        this.relationship = Relationship;
    }

    public String getNameSurname() {
        return nameSurname;
    }

    public void setNameSurname(String nameSurname) {
        this.nameSurname = nameSurname;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getWorkPhone() {
        return workPhone;
    }

    public void setWorkPhone(String workPhone) {
        this.workPhone = workPhone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    
    
}
