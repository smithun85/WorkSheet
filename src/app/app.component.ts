import { Component , OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { userModal } from './modals/crud-model'
import { CrudService } from './service/crud.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('modalRef')
  modalRef?: BsModalRef;
  isAdded: boolean = false;
  isEditted: boolean = false;
  deleteUser_id:number = 0

  usersForm:FormGroup
  userData:userModal[]=[];
  all_userData:userModal[]=[]
  user_id:number = 0

  //searching:
  searchText:string = ''
  search_Data_Available:boolean = true;

   //Pagination 
   count:number = 0;
   currentPage:number= 1 ;
   limit:number = 3;
   limits:Array<number>= [3,4,5,6,7]
   rotate:boolean = true;
   maxSize:number = this.count
   showBoundaryLinks: boolean = true;

  //sorting:
  reverse:boolean = false;
  sortType: string = 'name';


 

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private userService: CrudService
  ) 
  {
    this.usersForm = new FormGroup({
      id : new FormControl(''),
      name: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      gender: new FormControl(''),
      city: new FormControl(''),
      conditions:new FormControl(false)
    });
  }

  ngOnInit(): void {  
    this.getData(); 
    this.userData = this.userData.slice(0,this.limit)      
  }


    //get All user_Data:
  getData() {  
    this.userService.getAllData().subscribe((data) => {
      // console.log("User_data",data.result)
      this.userData = data.result;
      this.all_userData =data.result
      this.count = this.userData.length;
      // console.log("Count",this.count);
    })

  }

  //signUp-modal
  openFormSignupModal(add: TemplateRef<any>) {
    this.isEditted = false
    this.isAdded = true
    this.modalRef = this.modalService.show(add);  
  }

  //update-modal
  openFormUpdateModal(edit: TemplateRef<any>, id:number) {
    this.user_id = id
    this.isAdded = false
    this.isEditted = true
    this.modalRef = this.modalService.show(edit);
    // console.log(this.userData);
    this.userData.map( (user:userModal)=>{
       if(user.id== id){
        this.usersForm.patchValue({
          id: user.id,
          name:user.name,
          address:user.address,
          email:user.email,
          mobile:user.mobile,
          gender:user.gender,
          city:user.city,
          condition:user.condition
        })
       }     
    })
  };

  //Delete-modal:
  openDeleteModal(delete_Modal: TemplateRef<any>, id:number) {
    this.deleteUser_id = id
    this.modalRef = this.modalService.show(delete_Modal);  
  }

  //reset Form:
  resetForm(){
    this.usersForm.reset()
  }

  //Post and update userForm_Data
  onSubmit(){  
    // console.log("Form_value",this.usersForm.value);
    if(this.isAdded){
      this.userService.postUsersData(this.usersForm.value).subscribe()
    }
    else if(this.isEditted){
      this.userService.updateUsersData(this.usersForm.value,this.user_id).subscribe()
    }
    // this.getData()
    this.resetForm()
    // console.log("UsersData:",this.userData);    
  }

  //Delete user-Data
  deleteUser(){
    this.userService.deleteUsersData(this.deleteUser_id).subscribe()
    // this.getData()
  }
 
  // Search Text
  search(text:string){ 
    if(this.searchText !== ''){  
            
      const searched_users = this.all_userData.filter(
        data =>{
          return data.name.toLowerCase().match(this.searchText.toLowerCase())
        }
      ) 
      //paginate with all searched data:
      let startItem = (this.currentPage-1) * this.limit;
      let endItem = this.currentPage * this.limit;
      this.userData = searched_users.slice(startItem,endItem)

      this.search_Data_Available = this.userData.length > 0;         
    } else{
      this.search_Data_Available = true
      this.getData()
      this.paginate()
    }     
  }
  
  //pagination_Logic_function:
paginate(){  
    let startItem = (this.currentPage-1) * this.limit;
    let endItem = this.currentPage * this.limit;
    this.userData = this.all_userData.slice(startItem,endItem)
    // console.log(startItem,endItem);
    // console.log("returnedLimitedItems", this.workData);
 
};

  //Pagination_Event
  changePage(event:PageChangedEvent ){
    this.currentPage = event.page;
    this.limit = event.itemsPerPage
    this.paginate()   
  };

//Change rows per page
  changeItemsPerPage(e:any){
    this.limit = e.value
    this.paginate()
  };
   
   //sorting
   sortClick(key:any){
    this.sortType = key; 
    this.reverse = !this.reverse

   let direction = !this.reverse  ? -1 : 1;
  
      this.userData = this.all_userData.sort((a:any,b:any)=>{
        if(a[key].toLowerCase().trim() < b[key].toLowerCase().trim()){   //a.key => not read b/c key is a dynamic data so use bracket notation
          return -1 * direction
        }else if(a[key].toLowerCase().trim() > b[key].toLowerCase().trim()){
          return 1*direction
        }else{
          return 0;
        }
       })
      this.paginate()
  }


 
}

