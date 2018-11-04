/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kadirkorkmaz.react.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum PaymentType {
    
    ADVANCE_PAYMENT("ADVANCE"), INSTALLMENT("INSTALLMENT");

    private final String stringValue;

    private PaymentType(String stringValue) {
        this.stringValue = stringValue;
    }

    @JsonCreator
    public static PaymentType fromString(String value) {
        
        System.out.println("enum RegistrationType value is : " + value);
        
        if ("ADVANCE".equals(value)) {
            return PaymentType.ADVANCE_PAYMENT;
        } else if ("INSTALLMENT".equals(value)) {
            return PaymentType.INSTALLMENT;
        }

        return null;
    }

    @JsonValue
    public String getKey() {
        return stringValue;
    }
    
}
