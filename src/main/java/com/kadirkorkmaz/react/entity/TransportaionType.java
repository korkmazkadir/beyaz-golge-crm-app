package com.kadirkorkmaz.react.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TransportaionType {
    PERSONAL("PERSONAL"), BUS_TEMINAL("BUS_TERMINAL"), AIRPORT("AIRPORT");

    private final String stringValue;

    private TransportaionType(String stringValue) {
        this.stringValue = stringValue;
    }

    @JsonCreator
    public static TransportaionType fromString(String value) {

        System.out.println("enum RegistrationType value is : " + value);

        if ("PERSONAL".equals(value)) {
            return TransportaionType.PERSONAL;
        } else if ("BUS_TERMINAL".equals(value)) {
            return TransportaionType.BUS_TEMINAL;
        } else if ("AIRPORT".equals(value)) {
            return TransportaionType.AIRPORT;
        }

        return null;
    }

    @JsonValue
    public String getKey() {
        return stringValue;
    }

}
