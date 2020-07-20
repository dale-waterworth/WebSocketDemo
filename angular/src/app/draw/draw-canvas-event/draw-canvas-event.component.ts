import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { DrawCanvasComponent } from '../draw-canvas/draw-canvas.component';
import { DrawingStroke } from '../draw.service';


export interface PostionEvent {
  x: number;
  y: number;
}

@Component({
  selector: 'app-draw-canvas-event',
  templateUrl: './draw-canvas-event.component.html',
  styleUrls: ['./draw-canvas-event.component.css']
})
export class DrawCanvasEventComponent implements OnInit {

  @Output() drawEvent = new EventEmitter<DrawingStroke>();

  @ViewChild(DrawCanvasComponent, { static: true }) _canvasWrapper: DrawCanvasComponent;
  canvasWrapper: DrawCanvasComponent;
  canvas;
  ctx;
  offset;
  sentCount = 0;

  pos: PostionEvent = { x: 0, y: 0 };

  count = 0;

  constructor() { }

  ngOnInit() {
    this.canvasWrapper = this._canvasWrapper;
    this.canvas = this.canvasWrapper._canvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mousedown', this.setPosition.bind(this));
    this.canvas.addEventListener('mouseup', this.setPosition.bind(this));

    this.canvas.addEventListener('touchmove', this.draw.bind(this));
    this.canvas.addEventListener('touchstart', this.setPosition.bind(this));
    this.canvas.addEventListener('touchend', this.setPosition.bind(this));
  }

  setPosition(e) {
    this.calcPosition(e);

    const event = {
      x: this.pos.x,
      y: this.pos.y,
      type: 'position',
      userUUID: null
    };

    this.canvasWrapper.update(event)

    this.drawEvent.emit(event);

    this.draw(e);

    this.sentCount++;
  }

  draw(e) {

    const leftButton = 1;
    if (e.buttons !== leftButton) {
      return;
    }

    const event: DrawingStroke = {
      x: this.pos.x,
      y: this.pos.y,
      type: 'draw',
      userUUID: null
    };

    this.calcPosition(e);

    this.canvasWrapper.update(event);

    if (!this.isOutsideConvas()) {
      this.sendUpdate(event);
    }
  }

  sendUpdate(update: DrawingStroke) {
    this.drawEvent.emit(update);

    this.sentCount++;
  }


  calcPosition(e) {
    this.offset = this.getOffset();
    this.pos.x = e.clientX - this.offset.x;
    this.pos.y = e.clientY - this.offset.y;
  }

  getOffset() {
    return this.canvas.getBoundingClientRect();
  }

  isOutsideConvas() {
    return (this.pos.x < 0 || this.pos.x > this.offset.width ||
      this.pos.y < 0 || this.pos.y > this.offset.height);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

}
