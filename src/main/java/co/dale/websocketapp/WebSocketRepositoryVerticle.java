package co.dale.websocketapp;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import io.vertx.core.shareddata.LocalMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.Optional;

public class WebSocketRepositoryVerticle extends AbstractVerticle {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final WebSocketConfig config;

    public WebSocketRepositoryVerticle(WebSocketConfig config) {
        this.config = config;
    }

    @Override
    public void start() {
        log.info("Started WebSocketRepositoryVerticle {}", config.getPort());
        vertx.eventBus().consumer(Commands.newDrawing, this::newDrawing);
        vertx.eventBus().consumer(Commands.newDrawGuest, this::newDrawGuest);

        log.info("Setup consumers {} {}", Commands.drawEvent, Commands.newDrawing);
    }
    private void saveDrawState(Message message) {
        log.info("draw {}", message.body().toString());
    }

    // {"id":"85a3e1ab-a4c7-4409-aa34-dcf1e3dc73bd","name":"Dale",
    // "host":true,"command":"new-drawing"}
    private void newDrawing(Message message) {
        log.info("new drawing {}", message.body().toString());
        var body = new JsonObject(message.body().toString());
        var id = body.getString("meetingUUID");
        var name = body.getString("name");

        getDrawState(id).ifPresentOrElse(drawState -> {
            message.reply(JsonObject.mapFrom(getDrawState(id).get()));
        }, () ->{
            var drawGuests = Arrays.asList(new DrawGuest(id, name));
            var drawState = new DrawState(id, drawGuests);
            save(drawState);

            message.reply(JsonObject.mapFrom(getDrawState(id).get()));
        });
    }

    //{"id":"955af0bc-cac4-427e-993c-964cbefae73a","host":false,
    // "meetingUUID":"85a3e1ab-a4c7-4409-aa34-dcf1e3dc73bd","name":"new person",
    // "command":"new-user"}
    private void newDrawGuest(Message message) {
        log.info("new drawing {}", message.body().toString());
        var body = new JsonObject(message.body().toString());
        var drawingId = body.getString("meetingUUID");
        var userId = body.getString("id");
        var name = body.getString("name");

        var drawState = getDrawState(drawingId).get();
        var guestExists = drawState.getDrawGuests().stream()
                .map(DrawGuest::getId)
                .anyMatch(userId::equals);

        if(!guestExists){
            drawState.getDrawGuests().add(new DrawGuest(userId, name));
        }
        save(drawState);

        log.info("Added new draw guest {}", userId);

        message.reply(JsonObject.mapFrom(drawState));
    }

    private Optional<DrawState> getDrawState(String id) {
        LocalMap<String, String> drawSession = vertx.sharedData().getLocalMap(id);
        return Optional.of(drawSession)
                .filter(q -> !q.isEmpty())
                .map(this::convertToDrawState);
    }

    private DrawState convertToDrawState(LocalMap<String, String> stringLocalMap) {
        try {
            return Json.decodeValue(stringLocalMap.get("drawState"), DrawState.class);
        } catch (Exception e) {
            log.error("error {}", e);
            throw new RuntimeException("failed to parse");
        }
    }

    private void save(DrawState drawState) {
        vertx.sharedData().getLocalMap(drawState.getId())
                .put("drawState", Json.encodePrettily(drawState));
    }


}
