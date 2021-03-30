import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDonationsForInstitutionComponent } from './my-donations-for-institution.component';

describe('MyDonationsForInstitutionComponent', () => {
  let component: MyDonationsForInstitutionComponent;
  let fixture: ComponentFixture<MyDonationsForInstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDonationsForInstitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDonationsForInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
