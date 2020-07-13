package co.dale.websocketapp;

import io.vertx.config.ConfigRetriever;
import io.vertx.core.Vertx;
import io.vertx.core.json.Json;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

public class WebSocketApp {

    public static void main(String[] args) {
        Logger log = LoggerFactory.getLogger(WebSocketApp.class);

        Vertx vertx = Vertx.vertx();

        ConfigRetriever retriever = ConfigRetriever.create(vertx);
        retriever.getConfig(json -> {
            var configString = json.result().getJsonObject("config").toString();
            var config = Json.decodeValue(configString, WebSocketConfig.class);
            log.info("config {}", config);

            var port = Optional.ofNullable(System.getenv("PORT"))
                    .map(Integer::parseInt)
                    .orElse(config.getPort());
            config.setPort(port);

            vertx.deployVerticle(new WebSocketVerticle(config), event -> {
                log.info("{} WebSocketVerticle deployed", WebSocketVerticle.class);
            });

            vertx.deployVerticle(new WebSocketRepositoryVerticle(config), event -> {
                log.info("{} WebSocketRepostitoryVerticle deployed", WebSocketRepositoryVerticle.class);
            });

            vertx.deployVerticle(new WebSocketCreatorHandler(config), event -> {
                log.info("{} WebSocketCreatorHandler deployed", WebSocketCreatorHandler.class);
            });

            vertx.deployVerticle(new DrawEventVerticle(config), event -> {
                log.info("{} QuizEvent deployed", DrawEventVerticle.class);
            });
        });

        vertx.exceptionHandler(event -> {
            log.error(event + " throws exception: " + event.getStackTrace());
        });
    }
}
