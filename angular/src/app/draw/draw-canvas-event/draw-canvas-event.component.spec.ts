import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawCanvasEventComponent } from './draw-canvas-event.component';

describe('DrawCanvasEventComponent', () => {
  let component: DrawCanvasEventComponent;
  let fixture: ComponentFixture<DrawCanvasEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawCanvasEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawCanvasEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
