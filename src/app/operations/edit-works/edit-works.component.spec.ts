import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorksComponent } from './edit-works.component';

describe('EditWorksComponent', () => {
  let component: EditWorksComponent;
  let fixture: ComponentFixture<EditWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
