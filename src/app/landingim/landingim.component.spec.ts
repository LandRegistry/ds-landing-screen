import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingimComponent } from './landingim.component';

describe('LandingimComponent', () => {
  let component: LandingimComponent;
  let fixture: ComponentFixture<LandingimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
