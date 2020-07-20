import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawGridComponent } from './draw-grid.component';

describe('DrawGridComponent', () => {
  let component: DrawGridComponent;
  let fixture: ComponentFixture<DrawGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
