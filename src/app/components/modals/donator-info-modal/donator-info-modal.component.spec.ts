import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatorInfoModalComponent } from './donator-info-modal.component';

describe('DonatorInfoModalComponent', () => {
  let component: DonatorInfoModalComponent;
  let fixture: ComponentFixture<DonatorInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonatorInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatorInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
