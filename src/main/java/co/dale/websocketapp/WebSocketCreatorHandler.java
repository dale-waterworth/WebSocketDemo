package co.dale.websocketapp;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WebSocketCreatorHandler extends AbstractVerticle {
    private final WebSocketConfig config;
    private final Logger log = LoggerFactory.getLogger(getClass());

    public WebSocketCreatorHandler(WebSocketConfig config) {
        this.config = config;
    }

    @Override
    public void start() {
        createDrawingListener();
    }

    // {"id":"85a3e1ab-a4c7-4409-aa34-dcf1e3dc73bd","name":"Dale","host":true}
    private void createDrawingListener() {
        log.info("setting up consumer {}.new ", config.getClientToServer());
        vertx.eventBus().consumer(config.getClientToServer() + ".new")
                .handler(message -> {
                    log.info("create drawing {}", message.body());

                    var body = new JsonObject(message.body().toString());

                    createDrawing(message, body);

                    var drawId = body.getString("id");
                    createListeners(drawId);
                });
    }

    private void createDrawing(Message<Object> message, JsonObject body) {
        var send = body.put("command", Commands.newDrawing);

        vertx.eventBus().request(Commands.newDrawing, send, event -> {
            log.info("drawing created {}", event.result().body());
            message.reply(JsonObject.mapFrom(event.result().body()));
        });
    }

    private void createListeners(String drawId) {
        log.info("Setting up draw listeners");
        vertx.eventBus().consumer(config.getClientToServer() + "." + drawId,
                event -> {
                    vertx.eventBus().send(Commands.drawEvent, event.body().toString());
                });
    }
}
