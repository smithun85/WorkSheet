import { Component } from '@angular/core';

@Component({
  selector: 'app-add-works',
  templateUrl: './add-works.component.html',
  styleUrls: ['./add-works.component.scss']
})
export class AddWorksComponent {

  workData:any=''
  addWork(work:any){
    this.workData = work;

    console.log("workData:",this.workData);
  }

}
