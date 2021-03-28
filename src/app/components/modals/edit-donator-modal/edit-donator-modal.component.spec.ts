import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDonatorModalComponent } from './edit-donator-modal.component';

describe('EditDonatorModalComponent', () => {
  let component: EditDonatorModalComponent;
  let fixture: ComponentFixture<EditDonatorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDonatorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDonatorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
