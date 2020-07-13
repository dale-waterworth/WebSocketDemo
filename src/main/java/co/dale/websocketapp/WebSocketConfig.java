package co.dale.websocketapp;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WebSocketConfig {
    @JsonProperty("port")
    private int port;
    @JsonProperty("server-to-client")
    private String serverToClient;
    @JsonProperty("client-to-server")
    private String clientToServer;

    public int getPort() {
        return port;
    }

    public String getServerToClient() {
        return serverToClient;
    }

    public String getClientToServer() {
        return clientToServer;
    }

    @Override
    public String toString() {
        return "QuizConfig{" +
                "port=" + port +
                ", serverToClient='" + serverToClient + '\'' +
                ", clientToServer='" + clientToServer + '\'' +
                '}';
    }

    public void setPort(int port) {
        this.port = port;
    }
}
