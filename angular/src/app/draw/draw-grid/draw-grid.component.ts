import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { User } from 'src/app/services/user.service';
import { DrawService, DrawGuest, DrawingStroke } from '../draw.service';
import { DrawingUpdaterComponent } from './drawing-updater/drawing-updater.component';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';


interface DrawSubject {
  [index: string]: Subject<DrawingStroke>
}

@Component({

  selector: 'app-draw-grid',
  templateUrl: './draw-grid.component.html',
  styleUrls: ['./draw-grid.component.css']
})
export class DrawGridComponent implements OnInit {

  @ViewChild('drawingList', { static: false, read: ViewContainerRef }) drawGrid: ViewContainerRef;

  attendeesInList: DrawSubject = {};
  eventCount = 0;


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private drawService: DrawService
  ) { }

  ngOnInit() {
    this.listenForStart();

    this.listenForDrawEvents();
  }

  listenForStart() {
    this.drawService.drawStart
      .pipe(
        filter(x => x !== null)
      )
      .subscribe(event => this.createDrawingGrid());
  }

  private createDrawingGrid() {
    this.drawService.data.drawState.drawGuests.forEach((attendee) => {

      this.attendeesInList[attendee.id] = new Subject();

      this.addDrawing(attendee, this.attendeesInList[attendee.id]);
    });
  }

  listenForDrawEvents() {
    this.drawService.drawEvent
      .pipe(
        filter(x => x !== null)
      )
      .subscribe((event: any) => {

        if (event['command'] === 'draw-event') {

          this.attendeesInList[event.userUUID].next(event);
          this.eventCount++;

        } else if (event['command'] === 'new-draw-guest') {

          // init if first time
          if (!this.drawService.data.drawState) {

            this.drawService.data.drawState = event.drawState;
            this.createDrawingGrid();

          } else {

            // new person joing the existing
            event.drawState.drawGuests.forEach(drawGuest => {
              if (!(drawGuest.id in this.attendeesInList)) {
                this.attendeesInList[drawGuest.id] = new Subject();
                this.addDrawing(drawGuest, this.attendeesInList[drawGuest.id]);
              }
            });

          }

        }
      })
  }

  addDrawing(attendee: DrawGuest, subject: Subject<DrawingStroke>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DrawingUpdaterComponent);
    const cmpRef = this.drawGrid.createComponent(componentFactory);
    cmpRef.instance.attendee = attendee;
    cmpRef.instance.drawEvent = subject;

  }

}
