package com.kadirkorkmaz.react.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "meeting")
@Data
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "date")
    private Date date;

    @Column(name = "note")
    private String note;
    
    @Column(name = "done_by")
    private String username;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "registration_id")
    private Registration registration;

}
