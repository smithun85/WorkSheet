import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  
  workListForm = new FormGroup({
    id:new FormControl(''),
    title:new FormControl(''),
    description:new FormControl('')
  })
  
  constructor(){}

  //receive data from editComponent for set the value in form:(child to parent)
  @Input() workEditedData:any

  //send Input_Data to AddComponent:(parent to child)
  @Output() newWorkEvent = new EventEmitter<any>()

  
 

  onSubmit(){
   console.log("Form_value",this.workListForm.value);
   console.log("receivedEditedData:",this.workEditedData);
   this.newWorkEvent.emit(this.workListForm.value)
  }

  ngOnInit(){
    let workDataById = {
      title:this.workEditedData.title,
      description:this.workEditedData.description,
      id:this.workEditedData.id
    };

    this.workListForm.patchValue(workDataById)


  }


}
