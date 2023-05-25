import { Component , OnInit, TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';

import { WorksApiService } from '../works-api.service';
import { Works } from '../works-interface';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit{

  modalRef?: BsModalRef;
  workListForm:FormGroup | any
  workData: Works[] = [] 
  workUpdatedData:any = {}

  constructor(
    private router:Router, 
    private modalService:BsModalService,
    private api:WorksApiService
    ){ }

   

  ngOnInit(): void {

    this.getData()

    this.workListForm = new FormGroup({
      id:new FormControl(''),
      title:new FormControl(''),
      description:new FormControl('')
    });
    

  }

  openModalAdd(add: TemplateRef<any>) {
    this.modalRef = this.modalService.show(add);
    this.workListForm.reset()
  }

  //
  resetForm(){
    this.workListForm.reset()
  }

  openModalEdit(edit: TemplateRef<any>, id:number) {
    this.modalRef = this.modalService.show(edit);

    console.log(this.workData);
    this.workData.map( (item:any, i:number)=>{
      console.log(item);
     
       if(item.id== id){
        this.workUpdatedData = {
          title:item.title,
          description:item.description,
          id:item.id
        }
       }
      this.workListForm.patchValue(this.workUpdatedData)
    })
  }
  

//get Work_Data
getData(){
  this.api.getAllData()
  .subscribe(data => {
   this.workData=data.data.WorkFlow
    // console.log(data.data.WorkFlow)
  });
}

//Post Work_Data
  onSubmitAdd(){
    console.log("Form_value",this.workListForm.value);
    // this.workData.push(this.workListForm.value)
    this.api.postWorkData(this.workListForm.value)
    .subscribe( res =>{
      // console.log("Post_data",res);
      this.getData();
      this.workListForm.reset()
    })
   
    console.log("WorkData:",this.workData);
    
   }



   
   onSubmitEdit(id:number){
    this.api.updateWorkData(this.workListForm.value, id)
    .subscribe( res =>{
      console.log(res);
      this.getData();
      this.workListForm.reset()
    })

    console.log("Work_Updated_Data:",this.workData);
  
  
   };
   



   //Delete Work_data
   deleteWork(id:number){
    this.api.deleteWorkData(id)
    .subscribe( data=>{
      this.getData()
    })
   }


}