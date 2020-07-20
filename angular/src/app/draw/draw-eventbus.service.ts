import { Injectable } from '@angular/core';
import { EventbusService } from '../services/eventbus.service';
import { filter } from 'rxjs/operators';
import EventBus from 'vertx3-eventbus-client';
import { User } from '../services/user.service';

export interface DrawEventbusEventHandlers {
  onSuccess: Function,
  onDrawEvent: Function
}

@Injectable({
  providedIn: 'root'
})
export class DrawEventbusService {

  private serverToClient = 'server.to.client.';
  private clientToServer = 'client.to.server.';

  constructor(
    private eventBusService: EventbusService
  ) { }


  hostDrawingSession(user: User, eventHandlers: DrawEventbusEventHandlers) {
    this.getEventBus()
      .subscribe(eventBus => this.init(eventBus, user, eventHandlers));
  }

  joinDrawingSession(user: User, eventHandler: DrawEventbusEventHandlers['onDrawEvent']) {
    this.getEventBus()
      .subscribe(eventBus => { this.initDrawGuest(eventBus, user, eventHandler) });
  }

  private getEventBus() {
    return this.eventBusService.eventBus
      .pipe(
        filter(eb => eb !== null)
      );
  }

  private init(eventBus: EventBus, user: User, eventHandlers: DrawEventbusEventHandlers) {
    console.log('DrawEventbusService event bus active');

    console.log('sender', this.clientToServer + user.meetingUUID);


    eventBus.send(this.clientToServer + 'new', user, (x, y) => {
      console.log('new drawing', x, y);

      eventHandlers.onSuccess(x, y);

      this.setHandlers(eventBus, user, eventHandlers.onDrawEvent);

    });
  }

  private initDrawGuest(eventBus: EventBus, user: User, eventHandler: DrawEventbusEventHandlers['onDrawEvent']) {
    console.log('DrawEventbusService event bus active');

    console.log('sender', this.clientToServer + user.meetingUUID);

    user['command'] = 'new-draw-guest';
    this.setHandlers(eventBus, user, eventHandler);
    eventBus.send(this.clientToServer + user.meetingUUID, user);

  }

  private setHandlers(eventBus: EventBus, user: User, eventHandler: DrawEventbusEventHandlers['onDrawEvent']) {
    // set the event handler from the draw service
    eventBus.registerHandler(this.serverToClient + user.meetingUUID, eventHandler);

  }

  sendEvent(id: string, command: string, event: any) {
    event.command = command
    event.meetingUUID = id;
    this.getEventBus().subscribe(eventBus => {
      eventBus.send(this.clientToServer + id, event);
    });
  }


}
