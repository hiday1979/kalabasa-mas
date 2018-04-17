import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuteComponent } from './abute.component';

describe('AbuteComponent', () => {
  let component: AbuteComponent;
  let fixture: ComponentFixture<AbuteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbuteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
