import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-call-api',
  templateUrl: './call-api.component.html',
  styleUrls: ['./call-api.component.scss']
})
export class CallApiComponent {

  workListForm = new FormGroup({
    id:new FormControl(''),
    url:new FormControl(''),
    type:new FormControl(''),
    body:new FormControl('')
  })

  onSubmit(){

  }

}
