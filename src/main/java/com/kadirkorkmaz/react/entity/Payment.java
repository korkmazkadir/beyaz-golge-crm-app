/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kadirkorkmaz.react.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "payment")
@Data
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type", nullable = false)
    private PaymentType type;

    @Column(name = "rank", nullable = false)
    private Integer rank;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "is_collected", columnDefinition = "boolean default false", nullable = false)
    private Boolean isCollected;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "registration_id")
    private Registration registration;

    public Payment() {
    }

    public Payment(PaymentType type, Integer order, Date date, Double amount, Boolean isCollected, Registration registration) {
        this.type = type;
        this.rank = order;
        this.date = date;
        this.amount = amount;
        this.isCollected = isCollected;
        this.registration = registration;
    }

    public Payment(Long id, PaymentType type, Integer order, Date date, Double amount, Boolean isCollected, Registration registration) {
        this.id = id;
        this.type = type;
        this.rank = order;
        this.date = date;
        this.amount = amount;
        this.isCollected = isCollected;
        this.registration = registration;
    }

}
