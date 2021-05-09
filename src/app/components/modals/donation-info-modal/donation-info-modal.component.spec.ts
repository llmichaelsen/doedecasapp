import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationInfoModalComponent } from './donation-info-modal.component';

describe('DonationInfoModalComponent', () => {
  let component: DonationInfoModalComponent;
  let fixture: ComponentFixture<DonationInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
