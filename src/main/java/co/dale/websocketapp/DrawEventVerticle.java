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

        switch (getCommand(body)){
            case Commands.drawEvent:
                log.info("Sending to {} body {}", drawId, body);
                vertx.eventBus().publish(config.getServerToClient() + "." + drawId, body.toString());
                message.reply("ok");
                break;
            case Commands.newDrawGuest:
                vertx.eventBus().request(Commands.newDrawGuest, body.toString(), event -> {
                    var send = body.put("drawState", event.result().body()).toString();
                    vertx.eventBus().publish(config.getServerToClient() + "." + drawId,send);
                    message.reply("ok");
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
