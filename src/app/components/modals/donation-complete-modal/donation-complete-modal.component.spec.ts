import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationCompleteModalComponent } from './donation-complete-modal.component';

describe('DonationCompleteModalComponent', () => {
  let component: DonationCompleteModalComponent;
  let fixture: ComponentFixture<DonationCompleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationCompleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationCompleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
