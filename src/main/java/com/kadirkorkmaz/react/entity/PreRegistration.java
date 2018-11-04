
package com.kadirkorkmaz.react.entity;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class PreRegistration {
    
    @Column(name = "date")
    private Date date;

    @Column(name = "price_offer")
    private int priceOffer;
    
    @Column(name = "note", length = 300)
    private String note;

    public PreRegistration() {
    }

    public PreRegistration(Date date, int priceOffer, String note) {
        this.date = date;
        this.priceOffer = priceOffer;
        this.note = note;
    }

}

