import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-works',
  templateUrl: './edit-works.component.html',
  styleUrls: ['./edit-works.component.scss']
})
export class EditWorksComponent {

  workData:any = []
  editedData:any={title:"title", description:"description", id:1}

  editWork(work:any){
    this.workData = work

    console.log("EditedData", this.workData);
  }
}
