import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInputFieldsComponent } from './add-input-fields.component';

describe('AddInputFieldsComponent', () => {
  let component: AddInputFieldsComponent;
  let fixture: ComponentFixture<AddInputFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInputFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInputFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
