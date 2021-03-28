import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationRequestModal } from './donation-request-modal.component';

describe('DonationRequestModal', () => {
  let component: DonationRequestModal;
  let fixture: ComponentFixture<DonationRequestModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationRequestModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationRequestModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
