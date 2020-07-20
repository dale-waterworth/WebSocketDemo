import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTextSubmitComponent } from './single-text-submit.component';

describe('SingleTextSubmitComponent', () => {
  let component: SingleTextSubmitComponent;
  let fixture: ComponentFixture<SingleTextSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTextSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTextSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
