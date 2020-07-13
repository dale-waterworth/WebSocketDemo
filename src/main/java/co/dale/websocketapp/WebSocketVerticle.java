package co.dale.websocketapp;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.AsyncResult;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.bridge.PermittedOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.ext.web.handler.sockjs.BridgeOptions;
import io.vertx.ext.web.handler.sockjs.SockJSHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// setup the socket connection listeners

public class WebSocketVerticle extends AbstractVerticle {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final WebSocketConfig config;

    public WebSocketVerticle(WebSocketConfig config) {
        this.config = config;
    }

    @Override
    public void start() {
        Router router = Router.router(vertx);
        log.info("Starting QuizSocketVerticle {}", config.getPort());

        setHeaders(router);

        SockJSHandler sockJSHandler = SockJSHandler.create(vertx);
        sockJSHandler.bridge(getBridgeOptions()); //, this::bridgeEventHandler);

        setHeaders(router);

        //creates 'hand-shake'
        router.route("/eventbus/*")
                .handler(sockJSHandler)
                .failureHandler(error -> log.error("error {}", error));
        setHeaders(router);

        // serve Angular app
        router.route().handler(StaticHandler.create()
                .setCachingEnabled(false)
                .setIndexPage("/index.html"));
        router.routeWithRegex("\\/.+").handler(context -> {
            context.reroute("/index.html");
        });


        vertx.createHttpServer()
                .requestHandler(router)
                .listen(config.getPort(), this::httpServerResult);
    }

    private BridgeOptions getBridgeOptions() {
        return new BridgeOptions()
                .addOutboundPermitted(
                        new PermittedOptions().setAddressRegex(config.getServerToClient() + "\\.[a-z-0-9]+"))
                .addInboundPermitted(
                        new PermittedOptions().setAddressRegex(config.getClientToServer() + "\\.[a-z-0-9]+"))
                .addInboundPermitted(new PermittedOptions().setAddressRegex(config.getClientToServer() + "\\.new"));
    }

    private void setHeaders(Router router) {
        router.route().handler(CorsHandler.create(".*.")
                .allowedMethod(HttpMethod.GET)
                .allowedMethod(HttpMethod.POST)
                .allowedMethod(HttpMethod.PATCH)
                .allowedMethod(HttpMethod.PUT)
                .allowedMethod(HttpMethod.OPTIONS)
                //  .allowCredentials(false)
                .allowedHeader("Access-Control-Request-Method")
                .allowedHeader("Access-Control-Allow-Method")
                .allowedHeader("Access-Control-Allow-Credentials")
                .allowedHeader("Access-Control-Allow-Origin")
                .allowedHeader("Access-Control-Allow-Headers")
                .allowedHeader("Content-Type"));
        router.route().handler(BodyHandler.create());
    }

    private void httpServerResult(AsyncResult<HttpServer> httpServerAsyncResult) {
        if (httpServerAsyncResult.succeeded()) {
            log.info("server now listening on " + config.getPort());
        } else {
            log.error("Failed to bind {}", httpServerAsyncResult.cause());
        }
    }
}
