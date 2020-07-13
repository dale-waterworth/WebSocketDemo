package co.dale.websocketapp;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;


public class DrawState {
    private final String id;
    private final List<DrawGuest> drawGuests;

    public DrawState(
            @JsonProperty("id") String id,
            @JsonProperty("drawGuests")List<DrawGuest> drawGuests) {
        this.id = id;
        this.drawGuests = drawGuests;
    }

    public String getId() {
        return id;
    }

    public List<DrawGuest> getDrawGuests() {
        return drawGuests;
    }
}
