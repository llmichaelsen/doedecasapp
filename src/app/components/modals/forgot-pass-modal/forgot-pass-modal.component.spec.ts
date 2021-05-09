import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassModalComponent } from './forgot-pass-modal.component';

describe('ForgotPassModalComponent', () => {
  let component: ForgotPassModalComponent;
  let fixture: ComponentFixture<ForgotPassModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPassModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
