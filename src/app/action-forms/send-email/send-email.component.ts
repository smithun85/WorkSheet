import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent {

  workListForm = new FormGroup({
    id:new FormControl(''),
    title:new FormControl(''),
    description:new FormControl('')
  })

  onSubmit(){
    
  }

}
