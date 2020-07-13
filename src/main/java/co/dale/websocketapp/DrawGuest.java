package co.dale.websocketapp;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DrawGuest {
    private final String id;
    private final String name;

    public DrawGuest(
            @JsonProperty("id")String id,
            @JsonProperty("name")String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
