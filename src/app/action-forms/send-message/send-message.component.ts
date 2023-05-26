import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent {

  workListForm = new FormGroup({
    id:new FormControl(''),
    title:new FormControl(''),
    description:new FormControl('')
  })

  onSubmit(){
    
  }

}
