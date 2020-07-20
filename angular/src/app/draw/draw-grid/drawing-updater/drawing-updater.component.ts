import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { User } from 'src/app/services/user.service';
import { DrawCanvasComponent } from '../../draw-canvas/draw-canvas.component';
import { DrawService, DrawingStroke } from '../../draw.service';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-drawing-updater',
  templateUrl: './drawing-updater.component.html',
  styleUrls: ['./drawing-updater.component.css']
})
export class DrawingUpdaterComponent implements OnInit {

  @Input() attendee: User;
  @Input() drawEvent: Subject<DrawingStroke>;
  eventCount = 0

  @ViewChild(DrawCanvasComponent, { static: true }) canvas: DrawCanvasComponent;

  constructor(
    private drawService: DrawService
  ) { }

  ngOnInit() {
    this.drawEvent
      .pipe(
        filter(x => x !== null)
      )
      .subscribe((drawingStroke: DrawingStroke) => {

        this.eventCount++;

        this.canvas.update(drawingStroke);

      });
  }

}
