import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsForInstitutionsComponent } from './maps-for-institutions.component';

describe('MapsForInstitutionsComponent', () => {
  let component: MapsForInstitutionsComponent;
  let fixture: ComponentFixture<MapsForInstitutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsForInstitutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsForInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
