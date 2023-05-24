import { Component , OnInit, TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent {

  modalRef?: BsModalRef;
  workData:any = [];
  workUpdatedData:any = {}

  constructor(private router:Router, private modalService: BsModalService){}

  openModalAdd(add: TemplateRef<any>) {
    this.modalRef = this.modalService.show(add);
  }

  openModalEdit(edit: TemplateRef<any>) {
    this.modalRef = this.modalService.show(edit);

    this.workData.map( (item:any, i:number)=>{
      console.log(item);
        this.workUpdatedData = {
        title:item.title,
        description:item.description,
        id:item.id
      }

      this.workListForm.patchValue(this.workUpdatedData)
    })
  }


  workListForm = new FormGroup({
    id:new FormControl(''),
    title:new FormControl(''),
    description:new FormControl('')
  })

  onSubmitAdd(){
    // console.log("Form_value",this.workListForm.value);
    this.workData.push(this.workListForm.value)
    console.log("WorkData:",this.workData);
    this.workListForm.reset()
   }

 
   onSubmitEdit(){
    
   }


}