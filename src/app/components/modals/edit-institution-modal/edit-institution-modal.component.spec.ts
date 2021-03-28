import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstitutionModalComponent } from './edit-institution-modal.component';

describe('EditInstitutionModalComponent', () => {
  let component: EditInstitutionModalComponent;
  let fixture: ComponentFixture<EditInstitutionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInstitutionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstitutionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
