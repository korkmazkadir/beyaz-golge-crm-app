package com.kadirkorkmaz.react.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum RegistrationType {

    PRE_REGISTRATION("PRE_REGISTRATION"), REGISTRATION("REGISTRATION");

    private final String stringValue;

    private RegistrationType(String stringValue) {
        this.stringValue = stringValue;
    }

    @JsonCreator
    public static RegistrationType fromString(String value) {
        
        System.out.println("enum RegistrationType value is : " + value);
        
        if ("PRE_REGISTRATION".equals(value)) {
            return RegistrationType.PRE_REGISTRATION;
        } else if ("REGISTRATION".equals(value)) {
            return RegistrationType.REGISTRATION;
        }

        return null;
    }

    @JsonValue
    public String getKey() {
        return stringValue;
    }
}
