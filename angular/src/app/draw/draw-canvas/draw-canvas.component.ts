import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawingStroke } from '../draw.service';

@Component({
  selector: 'app-draw-canvas',
  templateUrl: './draw-canvas.component.html',
  styleUrls: ['./draw-canvas.component.css']
})
export class DrawCanvasComponent implements OnInit {

  @ViewChild('canvas', { static: true }) _canvas;
  canvas;
  ctx;

  pos = { x: 0, y: 0 };

  constructor() { }

  ngOnInit() {
    this.canvas = this._canvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
  }

  update(drawing: DrawingStroke) {
    if (drawing.type === 'draw') {
      this.draw(drawing);
    } else {
      this.setPosition(drawing);
    }
  }

  private setPosition(position: DrawingStroke) {
    this.pos.x = position.x;
    this.pos.y = position.y;
  }

  private draw(e: DrawingStroke) {
    this.ctx.beginPath();

    this.ctx.lineWidth = 5;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#c0392b';

    this.ctx.moveTo(this.pos.x, this.pos.y); // from
    this.setPosition(e);

    this.ctx.lineTo(this.pos.x, this.pos.y); // to

    this.ctx.stroke(); // draw it!
  }

}
