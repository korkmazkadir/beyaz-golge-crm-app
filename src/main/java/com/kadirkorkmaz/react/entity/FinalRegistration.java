package com.kadirkorkmaz.react.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Data;

@Embeddable
@Data
public class FinalRegistration {

    @Column(name = "registration_date")
    private Date date;

    @Column(name = "price")
    private int price;

    @Column(name = "advance_payment")
    private int advancePayment;

    @Column(name = "number_of_installments")
    private int numberOfInstallments;

    @Column(name = "joining_date")
    private Date joiningDate;

    @Column(name = "leaving_date")
    private Date leavingDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "transportaion_type")
    private TransportaionType transportaionType;

    @Column(name = "trasnportation_note", length = 300)
    private String transportationNote;

    @Column(name = "form")
    private Boolean form = false;

    @Column(name = "agreement")
    private Boolean agreement = false;

    @Column(name = "health_report")
    private Boolean healthReport = false;

    public FinalRegistration() {
    }

    public FinalRegistration(Date date, int price, int advancePayment, int numberOfInstallments, Date joiningDate, Date leavingDate, TransportaionType transportaionType, String transportationNote) {
        this.date = date;
        this.price = price;
        this.advancePayment = advancePayment;
        this.numberOfInstallments = numberOfInstallments;
        this.joiningDate = joiningDate;
        this.leavingDate = leavingDate;
        this.transportaionType = transportaionType;
        this.transportationNote = transportationNote;
    }

    
}
