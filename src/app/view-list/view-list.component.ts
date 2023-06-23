import { Component , OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { WorksApiService } from '../works-api.service';
import { Works } from '../works-interface';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit{
  @ViewChild('modalRef')

  modalRef?: BsModalRef;
  workListForm:FormGroup | any
  workData: Works[] = [] ;
  returnedLimitedItems:Works[] = [];
  filteredCity:Works[]=[]
  searchText:string = ''
  workUpdatedData:any = {}

  //Pagination and sorting
  count:number = 0;
  public currentPage:number= 1 ;
  public limit:number = 3;
  public limits:Array<number>= [3,4,5]
  rotate:boolean = true;
  maxSize:number = this.count
  showBoundaryLinks: boolean = true;
  

  public sortType:string = "id";
  public sortBy:string= "asc"
  reverse:boolean = true;
  city:string = ''
  

  constructor(
    private router:Router, 
    private modalService:BsModalService,
    private api:WorksApiService
    ){ 
      this.workListForm = new FormGroup({
        id:new FormControl(''),
        title:new FormControl(''),
        description:new FormControl(''),
        city:new FormControl('')
      });
    }

   

  ngOnInit(): void {
    
    this.getData(); 
    this.workData = this.workData.slice(0,this.limit)   
    this.filteredCity = this.filteredCity.slice(0,this.limit) 
  }

  openModalAdd(add: TemplateRef<any>) {
    this.modalRef = this.modalService.show(add);
    this.workListForm.reset()
  }
 
  resetForm(){
    this.workListForm.reset()
  }

  openModalEdit(edit: TemplateRef<any>, id:number) {
    this.modalRef = this.modalService.show(edit);

    // console.log(this.workData);
    this.workData.map( (item:any, i:number)=>{
      // console.log(item);
     
       if(item.id== id){
        this.workUpdatedData = {
          title:item.title,
          description:item.description,
          city:item.city,
          id:item.id
        }
       }
      this.workListForm.patchValue(this.workUpdatedData)
    })
  }
  

//get Work_Data
getData(){
  this.api.postTitleAndPagination( this.currentPage , this.limit,this.sortBy,this.sortType,this.searchText, this.city).subscribe( res => console.log(res))
  this.api.getAllData()
  .subscribe(
    data => {
  //  this.workData=data.data.WorkFlow
  // console.log(data.WorkFlow)
  this.workData = data.WorkFlow;
  // this.count = data.count
  this.count = this.workData.length;

  this.filteredCity = data.WorkFlow.filter(
    (data:any) =>{  
      return data.city.toLowerCase().includes(this.city)                      
    });

   if(this.workListForm){
    this.filterCity();
    this.paginate()
   }
 
  
    //pagination 
    let startItem = (this.currentPage-1) * this.limit;
    let endItem = this.currentPage * this.limit;
    this.returnedLimitedItems = data.WorkFlow.slice(startItem,endItem)
    // console.log(startItem,endItem);
    // console.log("returnedLimitedItems", this.returnedLimitedItems);
   
  });
}

//filter city
filterCity(){
  this.api.getAllData()
  .subscribe(
    data => {
      this.workData = data.WorkFlow.filter(
    (data:any) =>{  
      return data.city.toLowerCase().includes(this.city)                      
    });
    this.count = this.workData.length
     // console.log("filteredCity",this.filteredCity);
    // console.log("city:",this.city);
    })
}

 //pagination 
paginate(){
  this.api.getAllData()
  .subscribe(
    data => {   
    let startItem = (this.currentPage-1) * this.limit;
    let endItem = this.currentPage * this.limit;
    this.workData = data.WorkFlow.slice(startItem,endItem)
    // console.log(startItem,endItem);
    // console.log("returnedLimitedItems", this.workData);
  })
}


//Post Work_Data
  onSubmitAdd(){
    // console.log("Form_value",this.workListForm.value);
    this.api.postWorkData(this.workListForm.value)
    .subscribe( res =>{
      console.log("Post_data",res);
      this.getData();
      this.workListForm.reset()    
    })
   
    console.log("WorkData:",this.workData);

    // this.router.navigate(['inputfields'])   
    
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


  
   //Pagination
   changePage(event:PageChangedEvent ){
    
    this.currentPage = event.page;
    this.limit = event.itemsPerPage
    // console.log('Current_Page:',event.page);
    // console.log("currentPage,itemperpage:",this.currentPage, this.limit);
  
    if(this.city){
     
     this.filterCity();
      let startItem = (this.currentPage-1) * this.limit;
    let endItem = this.currentPage * this.limit;
    this.workData = this.workData.slice(startItem ,endItem )
    }else{
      this.getData();     
      this.workData = this.returnedLimitedItems
    }
   
   }

   
   //sorting
   sortClick(key:any){
    this.sortType = key; 
    this.reverse = !this.reverse

   let direction = this.reverse  ? 1 : -1;
    this.workData.sort((a:any,b:any)=>{
    if(a[key].toLowerCase().trim() < b[key].toLowerCase().trim()){   //a.key => not read b/c key is a dynamic data so use bracket notation
      return -1 * direction
    }else if(a[key].toLowerCase().trim() > b[key].toLowerCase().trim()){
      return 1*direction
    }else{
      return 0;
    }
   })
  
    if(this.reverse == true){
       this.sortBy = 'asc';
    }else{
      this.sortBy = 'desc';
    }
    // this.reverse =! this.reverse
    
    this.api.postTitleAndPagination( this.currentPage , this.limit,this.sortBy,this.sortType,this.searchText, this.city).subscribe( res => console.log(res))
  }

  //Search
 search(){  
    if(this.searchText ===''){
      this.getData()
      this.workData = this.filteredCity
      this.count = this.workData.length 

      let startItem = (this.currentPage-1) * this.limit;
      let endItem = this.currentPage * this.limit;
      this.workData = this.workData.slice(startItem ,endItem )
    }
  }

  onClickSearch(text:string){
    this.api.postTitleAndPagination( this.currentPage , this.limit,this.sortBy,this.sortType,text,this.city).subscribe( res => console.log(res)) 
    if(this.searchText !== ''){
      let searchValue = this.searchText.toLowerCase();      
      this.workData = this.workData.filter(
        data =>{
          return data.title.toLowerCase().match(searchValue)
        }
      )     
    }
    
    
   
  }

  changeItemsPerPage(e:any){
    this.limit = e.value
    // this.api.postTitleAndPagination( this.currentPage , this.limit,this.sortBy,this.sortType,this.searchText, this.city).subscribe( res => console.log(res)) 
    if(this.city){
      this.getData();       
     this.filterCity();
    
      let startItem = (this.currentPage-1) * this.limit;
    let endItem = this.currentPage * this.limit;
    this.workData = this.workData.slice(startItem ,endItem )
    }else{
      this.getData();    
      // this.paginate()    
    }
  };

  changeCity(e:any){
    this.city = e.target.value.toLowerCase()  
    
    if(this.city ){
      this.getData()
      this.workData = this.filteredCity
    this.count = this.workData.length 
   
    this.currentPage = 1
    console.log(this.currentPage);
    let startItem = (this.currentPage-1) * this.limit;
    let endItem = this.currentPage * this.limit; 
    this.workData = this.workData.slice(startItem ,endItem )
    }else{
      this.getData();
    }
      
  }


}