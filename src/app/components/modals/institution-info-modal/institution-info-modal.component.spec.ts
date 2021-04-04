import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionInfoModalComponent } from './institution-info-modal.component';

describe('InstitutionInfoModalComponent', () => {
  let component: InstitutionInfoModalComponent;
  let fixture: ComponentFixture<InstitutionInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
