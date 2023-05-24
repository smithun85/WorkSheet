import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent {

  constructor(private router:Router){}

  onSubmit(){
this.router.navigate(['/add'])
  }

  goToEditForm(){
    this.router.navigate(['/edit'])
  }

}
