# WebsocketDemo

## Full article
https://dzone.com/articles/code-play-1-web-sockets-with-vertx-and-angular

### Running

To run the project simply clone and in the command line run:

`./gradlew run`

The log should show it running on 8081:

`[vert.x-eventloop-thread-2] INFO  co.dale.websocketapp.WebSocketVerticle - server now listening on 8081`

Fire up the browser

`http://localhost:8081/dashboard`

![Alt text](img/Screenshot2020-07-20at16.44.50.png?raw=true "Dashboard")

Copy and paste the URL and give that to other people to join (or another browser tab):
eg. `http://localhost:8081/draw/812db8cf-c813-4f30-a4fe-6a9640ae8995`

et voila:
![Alt text](img/Screenshot2020-07-20at16.56.11.png?raw=true "Dashboard")


### Editing
The Angular SPA can be found in 
`/angular`

You can also run this in dev mode and update the client on the fly:

cd into `/angular`

`npm install`

`ng serve`

Open 

`http://localhost:4200/`

This will still point to the server.

To update the UI, make the changes and run

`ng build --prod`

copy and paste the content into:

`src/main/resources/webroot`

Restart the server and open

`http://localhost:8081`

## Full article
https://dzone.com/articles/code-play-1-web-sockets-with-vertx-and-angular