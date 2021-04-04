import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDonationModalComponent } from './config-donation-modal.component';

describe('ConfigDonationModalComponent', () => {
  let component: ConfigDonationModalComponent;
  let fixture: ComponentFixture<ConfigDonationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigDonationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDonationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
