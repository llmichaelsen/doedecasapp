import { TestBed } from '@angular/core/testing';

import { MyDonationGuard } from './my-donation.guard';

describe('MyDonationGuard', () => {
  let guard: MyDonationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyDonationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
