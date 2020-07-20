package co.dale.websocketapp;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DrawEventVerticle extends AbstractVerticle {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final WebSocketConfig config;

    public DrawEventVerticle(WebSocketConfig config) {
        this.config = config;
    }

@Override
public void start() {
    vertx.eventBus().consumer(Commands.drawEvent, this::drawEvent);
}

private void drawEvent(Message message) {
    log.info("new Draw Event {}", message.body());
    var body = new JsonObject(message.body().toString());
    var drawId = body.getString("meetingUUID");

    switch (getCommand(body)) {
        case Commands.drawEvent:
            //{"x":239,"y":279,"type":"draw","userUUID":"1bacde6c-9e54-4692-8c98-d89db49c05df","command":"draw-event","meetingUUID":"1bacde6c-9e54-4692-8c98-d89db49c05df"}
            log.info("Sending to {} body {}", drawId, body);
            vertx.eventBus().publish(config.getServerToClient() + "." + drawId, body.toString());
            break;
        case Commands.newDrawGuest:
            // {"id":"a48ff5b2-57be-46ed-9ce8-8e6edbf67a2b","meetingUUID":"966bfc99-5bff-4503-8216-6efb64852d9d","host":false,"name":"bill","command":"new-draw-guest"}
            vertx.eventBus().request(Commands.newDrawGuest, body.toString(), event -> {
                var send = body.put("drawState", event.result().body()).toString();
                vertx.eventBus().publish(config.getServerToClient() + "." + drawId, send);
            });
            break;
    }
}

    private String getCommand(JsonObject message) {
        var command = message.getString("command");
        log.info("command {}", command);
        return command;
    }
}
