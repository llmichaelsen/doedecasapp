import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDonatorComponent } from './profile-donator.component';

describe('ProfileDonatorComponent', () => {
  let component: ProfileDonatorComponent;
  let fixture: ComponentFixture<ProfileDonatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDonatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDonatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
