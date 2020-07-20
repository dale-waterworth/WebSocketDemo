import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawDashboardComponent } from './draw-dashboard.component';

describe('DrawDashboardComponent', () => {
  let component: DrawDashboardComponent;
  let fixture: ComponentFixture<DrawDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
