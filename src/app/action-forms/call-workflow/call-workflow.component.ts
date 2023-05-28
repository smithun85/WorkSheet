import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-call-workflow',
  templateUrl: './call-workflow.component.html',
  styleUrls: ['./call-workflow.component.scss']
})
export class CallWorkflowComponent {

  workListForm = new FormGroup({
    id:new FormControl(''),
    body:new FormControl(''),
    subject:new FormControl(''),
    to:new FormArray([
    ]),

  })

  onSubmit(){
    
  }

}
