import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDonationsForDonatorComponent } from './my-donations-for-donator.component';

describe('MyDonationsForDonatorComponent', () => {
  let component: MyDonationsForDonatorComponent;
  let fixture: ComponentFixture<MyDonationsForDonatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDonationsForDonatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDonationsForDonatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
