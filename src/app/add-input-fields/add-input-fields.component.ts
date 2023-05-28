import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup,FormControl, Validators} from '@angular/forms';
import { WorksApiService } from '../works-api.service';
import { Works } from '../works-interface';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-input-fields',
  templateUrl: './add-input-fields.component.html',
  styleUrls: ['./add-input-fields.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AddInputFieldsComponent implements OnInit{ 


  workData?:Works 
  fieldForm: FormGroup;
  
  workflow:string[] = ['Actions', 'Conditions']
  
  actions:Array<any> = [ 
    {action:'send_Email',path:'email'},
    {action:'send_Message', path:'message'},
    {action:'call_api', path:'api'},
    {action:'call_Workflow', path: 'workflow'},
    {action:'custom_logic', path:'logic'},
  ];

  isSubmitted = false;
  fieldsName: string[] = ['input', 'textArea', 'select'];
  fieldsType:string[] = ['text','number','gmail','password','radio']

  actionValue:boolean = false
  conditionValue:boolean = false;

  email_Form:boolean = false
  message_Form:boolean = false
  api_Form:boolean = false
  workflow_Form:boolean = false
  logic_Form:boolean = false

     
  constructor(
    private fb:FormBuilder,
    private apiService:WorksApiService,
    private router:Router
  ) {  
     
    this.fieldForm = this.fb.group({  
      fields: this.fb.array([
        this.fb.group  
         ({  
            fieldName: '',  
            fieldType: '',  
            require:''
          })    
      ]) ,  
    });  

  }  ;

  //find the fields in fieldForm
  fields() : FormArray {  
    return this.fieldForm.get("fields") as FormArray  
  }  
  
  //add a new fields
  newField(): FormGroup {  
    return this.fb.group({  
      fieldName: '',  
      fieldType: '',  
      require:''
    })  
  }  
     
  addField() {  
    this.fields().push(this.newField());  
  }  
     
  removeField(i:number) {  
    this.fields().removeAt(i);  
  }  

 

  ngOnInit(): void { }

  // Action Form
  emailForm = new FormGroup({
    body:new FormControl(''),
    subject:new FormControl(''),
    to:new FormControl('')
  });

  messageForm = new FormGroup({
    body:new FormControl(''),
    to:new FormControl('')
  });

  apiForm = new FormGroup({
    url:new FormControl(''),
    type:new FormControl(''),
    body:new FormControl(''),   
  });

  workflowForm = new FormGroup({
    workflow:new FormControl(''),
    input_Value:new FormControl(''),  
  });

  logicForm = new FormControl('')




  // getDataById(){
  //   this.apiService.getDataById()
  //   .subscribe(data => {
  //    this.workData=data.data.WorkFlow
  //     // console.log(data.data.WorkFlow)
  //   });
  // }
   
  
  

  changedOption(e:any){
   
   if(e.target.value==="Actions"){
    this.actionValue = true
    this.conditionValue = false
    // console.log("event",e.target.value);
   }
   if(e.target.value==="Conditions"){
    this.conditionValue = true
    this.actionValue = false
    // console.log("event",e.target.value);
    this.email_Form = false;
    this.message_Form= false
    this.api_Form= false
    this.workflow_Form= false
    this.logic_Form= false
   }
  };

  changedActions(e:any){
   if(e.target.value === "send_Email"){
    this.email_Form = true;
    this.message_Form= false
    this.api_Form= false
    this.workflow_Form= false
    this.logic_Form= false
    // console.log("Email_event",e.target.value);
   };
   if(e.target.value === "send_Message"){
    this.message_Form = true;
    this.email_Form= false
    this.api_Form= false
    this.workflow_Form= false
    this.logic_Form= false;
    // console.log("Email_event",e.target.value);
   };
   if(e.target.value === "call_api"){
    this.api_Form = true;
    this.email_Form= false
    this.message_Form= false
    this.workflow_Form= false
    this.logic_Form= false;
    // console.log("Email_event",e.target.value);
   };
   if(e.target.value === "call_Workflow"){
    this. workflow_Form = true;
    this.email_Form= false
    this.message_Form= false
    this.api_Form= false
    this.logic_Form= false;

   
    // console.log("Email_event",e.target.value);
   };
   if(e.target.value === "custom_logic"){
    this.logic_Form= true;
    this.email_Form= false
    this.message_Form= false
    this.api_Form= false
    this.workflow_Form= false;  
    // console.log("Email_event",e.target.value);
   }
  }
  
     
  onSubmit() {  
    this.isSubmitted = true;
    console.log(this.fieldForm.value); 
    this.fieldForm.reset() 
  }  

  emailSubmit(){
console.log(this.emailForm.value);
  }

  messageSubmit(){
    console.log(this.messageForm.value);
  };

  apiSubmit(){
    console.log(this.apiForm.value);
  }

  workflowSubmit(){
    console.log(this.workflowForm.value);
  };

  logicSubmit(){
    console.log(this.logicForm.value);
  }


  // Condition Form:
condtionForm = new FormGroup({
  field_Name:new FormControl(''),
  field_Type:new FormControl(''),
  field_Value:new FormControl('')
})

changeFieldName(e: any) { 
 let  field_Name = this.condtionForm.get('field_Name');
  field_Name?.setValue(e.target.value, {
    onlySelf: true,
  });
};

changeFieldType(e: any) { 
  let  field_Type = this.condtionForm.get('field_Type');
   field_Type?.setValue(e.target.value, {
     onlySelf: true,
   });
 }

  conditionSubmit(): void {
    console.log(this.condtionForm);
    this.isSubmitted = true;
    if (!this.condtionForm.valid) {
      false;
    } else {
      console.log("Conditionform value:",JSON.stringify(this.condtionForm.value));
    }
  }

}
