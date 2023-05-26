import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-logic',
  templateUrl: './custom-logic.component.html',
  styleUrls: ['./custom-logic.component.scss']
})
export class CustomLogicComponent {

  workListForm = new FormGroup({
    id:new FormControl(''),
    title:new FormControl(''),
    description:new FormControl('')
  })

  onSubmit(){
    
  }

}
