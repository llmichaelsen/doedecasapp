import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInstitutionComponent } from './profile-institution.component';

describe('ProfileInstitutionComponent', () => {
  let component: ProfileInstitutionComponent;
  let fixture: ComponentFixture<ProfileInstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInstitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
