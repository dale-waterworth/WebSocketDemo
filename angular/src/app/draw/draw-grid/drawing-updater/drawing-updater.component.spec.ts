import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingUpdaterComponent } from './drawing-updater.component';

describe('DrawingUpdaterComponent', () => {
  let component: DrawingUpdaterComponent;
  let fixture: ComponentFixture<DrawingUpdaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingUpdaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
