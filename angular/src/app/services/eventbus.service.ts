import { Injectable } from '@angular/core';
import EventBus from 'vertx3-eventbus-client';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventbusService {

  options = {
    vertxbus_reconnect_attempts_max: 5, // Max reconnect attempts
    vertxbus_reconnect_delay_min: 1000, // Initial delay (in ms) before first reconnect attempt
    vertxbus_reconnect_delay_max: 5000, // Max delay (in ms) between reconnect attempts
    vertxbus_reconnect_exponent: 2, // Exponential backoff factor
    vertxbus_randomization_factor: 0.5 // Randomization factor between 0 and 1
  };

  private _eventBus: EventBus;
  eventBus = new BehaviorSubject(null);

  private meetingGuid;

  constructor(
  ) {
    this.init();
  }


  init() {
    this._eventBus = new EventBus(environment.eventBus, this.options);

    console.log('starting socket', environment.eventBus);
    this._eventBus.onopen = () => {
      console.log('this.eventBus open', this._eventBus);
      this.eventBus.next(this._eventBus);
    };
  }


  clearUp() {
    this._eventBus.close();
  }

}
