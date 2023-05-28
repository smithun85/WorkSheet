import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallWorkflowComponent } from './call-workflow.component';

describe('CallWorkflowComponent', () => {
  let component: CallWorkflowComponent;
  let fixture: ComponentFixture<CallWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
