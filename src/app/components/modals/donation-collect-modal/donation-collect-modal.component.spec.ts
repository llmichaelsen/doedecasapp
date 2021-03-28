import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationCollectModalComponent } from './donation-collect-modal.component';

describe('DonationCollectModalComponent', () => {
  let component: DonationCollectModalComponent;
  let fixture: ComponentFixture<DonationCollectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationCollectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationCollectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
