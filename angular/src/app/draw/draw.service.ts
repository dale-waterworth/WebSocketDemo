import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { DrawEventbusService, DrawEventbusEventHandlers } from './draw-eventbus.service';
import { User } from '../services/user.service';

import { Subject, BehaviorSubject } from 'rxjs';

export interface DrawGuest {
  id: string;
  name: string;
};

export interface DrawState {
  id: string;
  drawGuests: DrawGuest[]
};

interface DrawData {
  drawState?: DrawState;
}

interface DrawStateResponse {
  body: DrawState;
  type: string;
  address: string;
};

export interface DrawingStroke {
  type: string;
  userUUID: string;
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  drawStart = new BehaviorSubject(null); // draw-grid.component listens on these
  drawEvent = new BehaviorSubject(null);

  data: DrawData = {
    drawState: null
  }

  constructor(
    private localStorage: LocalStorageService,
    public drawEventBusService: DrawEventbusService
  ) { }

  init(drawId: string) {

  }

  hostDrawingSession(user: User) {
    const handlers: DrawEventbusEventHandlers = {
      onSuccess: this.onSuccess.bind(this),
      onDrawEvent: this.eventHandler.bind(this)
    }
    this.drawEventBusService.hostDrawingSession(user, handlers);
  }

  joinDrawingGroup(user: User) {
    const handlers = {
      onDrawEvent: this.eventHandler.bind(this)
    }
    this.drawEventBusService.joinDrawingSession(user, handlers.onDrawEvent);
  }

  onSuccess(error, drawStateResponse: DrawStateResponse) {
    this.data.drawState = drawStateResponse.body;
    this.drawStart.next(true);
  }

  onGuestSuccess(error, drawStateResponse: DrawStateResponse) {
    console.log('onSuccess', error, drawStateResponse);
    this.data.drawState = drawStateResponse.body;
    this.drawStart.next(true);
  }

  eventHandler(error, message) {
    this.setEvent(JSON.parse(message.body));
  }

  setEvent(drawEvent) {
    this.drawEvent.next(drawEvent);
  }


  initUser(uuid) {
    console.log('added user to draw listener', uuid);
    this.data[uuid] = new Subject();
    return this.data[uuid];
  }

  processDrawing(drawingStroke: DrawingStroke) {
    const drawing = this.data[drawingStroke.userUUID];
    drawing.next(drawingStroke);
  }

  sendDrawEvent(id: string, event: DrawingStroke) {
    this.drawEventBusService.sendEvent(id, 'draw-event', event);
  }

}
