import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationOfferModalComponent } from './donation-offer-modal.component';

describe('DonationOfferModalComponent', () => {
  let component: DonationOfferModalComponent;
  let fixture: ComponentFixture<DonationOfferModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationOfferModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
