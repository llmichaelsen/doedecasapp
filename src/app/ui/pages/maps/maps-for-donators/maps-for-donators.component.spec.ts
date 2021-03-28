import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsForDonatorsComponent } from './maps-for-donators.component';

describe('MapsForDonatorsComponent', () => {
  let component: MapsForDonatorsComponent;
  let fixture: ComponentFixture<MapsForDonatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsForDonatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsForDonatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
